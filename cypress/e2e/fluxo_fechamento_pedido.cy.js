import BasePage from './pageObjects/BasePage';
import HomePage from './pageObjects/HomePage';
import RegisterPage from './pageObjects/RegisterPage';
import PaymentPage from './pageObjects/PaymentPage';
import CartPage from './pageObjects/CartPage';
import userData from '../fixtures/users/userData.json'
///<reference types="cypress" />

describe('Testes que envolvem o Fechamento de Pedido na Ferreira Costa com Pagamento via PIX', () => {

  beforeEach(() => {
    cy.visit('/') 
  });

  const selectorsList = {
    urlField: 'pathname',
    botaoCookie: '[data-cy="button-close-modal-cookie"]',
    botaoIconeCarrinho: '.cart-btn', // eq(0)
    produtoEscolhido: '.fQqina', // eq(0)
    adicionarAoCarrinho: '.ZtenW', // eq(0)
    logoLoja: '.styles__FcLogoBlackWrapper-sc-adc72ed4-23',
    abaCarrinho: '.piEFJ',
    botaoFecharPedidoAbaCarrinho: '.dSqjcx',
    botaoFecharPedidoPaginaCarrinho: '.ImePp',
    carrinhoBackground: '.dgpKPg',
    botaoEntrarPopUpLogin: '.kINcSM',
    botaoCadastrarPopUpLogin: '.Ydjie',
    campoNomeCadastro: '#name',
    campoCPFCadastro: '#cpf',
    campoEmailCadastro: '#email',
    campoCelularCadastro: '#phoneNumber',
    campoDataNascCadastro: '#birthdate',
    campoSenhaCadastro: '#password',
    campoConfirmSenhaCadastro: '#confirmPassword',
    termosCheckBoxCadastro: '#acceptedTermsUse',
    botaoContinuarCadastro: '.jfWhpQ',
    campoCodigoVerificacao: '.jNdhiG',
    botaoFecharPopUpVerificacao: '.hvhMPg',
    botaoEntrarCadastro: '.yLVYI',
    botaoIconePerfilEntrar: '.jDFuAe',
    campoLoginIconePerfilEntrar: '#login',
    campoSenhaIconePerfilEntrar: '#password',
    botaoEntrarIconePerfilEntrar: '.kINcSM',
    campoCepEnderecoPagamento: '#zipCode',
    campoNumeroEnderecoPagamento: '.dcICvc', //eq(4)
    campoComplementoEnderecoPagamento: '#addressComplement',
    campoPontoReferenciaEnderecoPagamento: '#referencePoint',
    campoNomeDestinatarioEnderecoPagamento: '#recipient',
    botaoSalvarEnderecoPagamento: '.hfarrR',
    botaoSelecionarEnderecoPagamento: '.bZCHgE', // eq(0)
    botaoEntregaRapidaPagamento: '.dDonWj', //eq(0)
    botaoEntregaEconomicaPagamento: '.dDonWj', //eq(1)
    botaoRetirarNaLojaPagamento: '.eNvxiQ',
    botaoSelecionarLojaRetiradaPagamento: '.dIFnry', // eq(1) Quando Retirar em Loja é selecionado
    botaoPagamentoPixPagamento: '#optionPaymentPix',
    botaoFinalizarPedidoPagamento: '.eVFsmM',
    botaoConfirmacaoFinalizarPedidoPagamento: '.jfWhpQ',
    botaoCopiarCodigoPixPagamento: '.gVfzqA',
    ImagemQrCodePixPagamento: '[data-cy="pix-payment-qr-code-image"]',
    iconeEnderecoAdicionadoSucesso: "[aria-label='concluido']",
    alertarDeErroCamposObrigatorios: '[data-cy="title-toast"]'
}

  context('Teste para visualizar botão "Fechar Pedido" na aba do carrinho', () => {
    it('Exibe o botão "Fechar Pedido" na aba do carrinho após adicionar produto', () => {

      HomePage.adicionarProdutoAoCarrinho();
      cy.get(selectorsList.botaoIconeCarrinho).eq(0).click()
      BasePage.espera4s();
      cy.get(selectorsList.abaCarrinho)
      cy.get(selectorsList.botaoFecharPedidoAbaCarrinho)
    });
  });

  context('Teste para visualizar botão "Fechar Pedido" na página do carrinho', () => {
    it('Exibe o botão "Fechar Pedido" na página "Meu Carrinho"', () => {
      HomePage.adicionarProdutoAoCarrinho();
      cy.location(selectorsList.urlField).should('equal', '/checkout/meu-carrinho')
      BasePage.espera5s();
      cy.get(selectorsList.botaoFecharPedidoPaginaCarrinho)
    });
  });

  context('Teste de Usuário não cadastrado iniciando processo de fechamento de pedido e pagamento via Pix', () => {
    it.only('Inicia o pagamento via Pix para usuário não cadastrado', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarCadastroUsuario();
      cy.get(selectorsList.campoCodigoVerificacao).eq(0)
      BasePage.espera2s();
      cy.get(selectorsList.botaoFecharPopUpVerificacao).click() // Aqui a Etapa de Verificação de Nova Conta com Código é Pulada
      BasePage.espera2s();
      cy.get(selectorsList.botaoEntrarCadastro).click()
      BasePage.espera2s();
      cy.get(selectorsList.botaoIconePerfilEntrar).click()
      BasePage.espera2s();
      RegisterPage.realizarLoginUsuario(); // Simula-se a realização de Login com a "Nova Conta" Criada
      cy.get(selectorsList.botaoIconeCarrinho).eq(0).click()
      BasePage.espera4s();
      cy.get(selectorsList.abaCarrinho)
      cy.get(selectorsList.botaoFecharPedidoAbaCarrinho).click()
      BasePage.espera2s();
      PaymentPage.preencherEndereco();
      cy.get(selectorsList.botaoEntregaRapidaPagamento).eq(0).click()
      PaymentPage.realizarPagamentoPix();
    });
  });

  context('Teste de Usuário cadastrado iniciando processo de fechamento de pedido e pagamento via Pix', () => {
    it('Inicia o pagamento via Pix para usuário cadastrado', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherEndereco();
      cy.get(selectorsList.botaoEntregaEconomicaPagamento).eq(1).click()
      PaymentPage.realizarPagamentoPix();
    });
  });

  context('Teste de modalidade de entrega escolhendo loja para retirada', () => {
    it('Seleciona modalidade "Retirar em Loja" e escolhe a loja', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherEndereco();
      cy.get(selectorsList.botaoRetirarNaLojaPagamento).click()
      cy.get(selectorsList.botaoSelecionarLojaRetiradaPagamento).eq(1).click()
    });
  });

  context('Teste de endereço de entrega escolhendo endereço salvo anteriormente', () => {
    it('Seleciona um endereço de entrega já salvo', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.botaoSelecionarEnderecoPagamento).eq(0).click()
    });
  });

  context('Testes dos campos obrigatórios no preenchimento do endereço de entrega', () => {
    it('Sucesso ao salvar endereço somente com Destinatário e Número', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      BasePage.espera2s();
      cy.get(selectorsList.campoNumeroEnderecoPagamento).eq(4).should('not.be.disabled').type(userData.numeroEndereco)
      cy.get(selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      BasePage.espera2s();
      cy.get(selectorsList.iconeEnderecoAdicionadoSucesso)
    });

    it('Alerta de erro ao salvar endereço sem Destinatário e sem Número', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      BasePage.espera2s();
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('contain', 'Preencha os campos obrigatórios antes de enviar.');
    });

    it('Alerta de erro ao salvar endereço sem Nome do destinatário', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      BasePage.espera2s();
      cy.get(selectorsList.campoNumeroEnderecoPagamento).eq(4).should('not.be.disabled').type(userData.numeroEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('contain', 'Preencha os campos obrigatórios antes de enviar.');
    });

    it('Alerta de erro ao salvar endereço sem Número', () => {
      BasePage.espera2s();
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      BasePage.espera2s();
      cy.get(selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('contain', 'Preencha os campos obrigatórios antes de enviar.');
    });
  });
});

