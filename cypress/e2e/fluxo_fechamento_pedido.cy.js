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
    semNumeroCheckBoxPagamento: '#noNumber',
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
      cy.get(selectorsList.abaCarrinho).should('be.visible')
      cy.get(selectorsList.botaoFecharPedidoAbaCarrinho)
    });
  });

  context('Teste para visualizar botão "Fechar Pedido" na página do carrinho', () => {
    it('Exibe o botão "Fechar Pedido" na página "Meu Carrinho"', () => {
      HomePage.adicionarProdutoAoCarrinho();
      cy.location(selectorsList.urlField).should('equal', '/checkout/meu-carrinho')
      cy.get(selectorsList.botaoFecharPedidoPaginaCarrinho).should('be.visible')
    });
  });

  context('Teste de Usuário não cadastrado iniciando processo de fechamento de pedido e pagamento via Pix', () => {
    it('Inicia o pagamento via Pix para usuário não cadastrado', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarCadastroUsuario();
      cy.get(selectorsList.campoCodigoVerificacao).eq(0)
      cy.get(selectorsList.botaoFecharPopUpVerificacao).should('be.visible').click() // Aqui a Etapa de Verificação de Nova Conta com Código é Pulada
      cy.get(selectorsList.botaoEntrarCadastro).should('be.visible').click()
      cy.get(selectorsList.botaoIconePerfilEntrar).should('be.visible').click()
      RegisterPage.realizarLoginUsuario(); // Simula-se a realização de Login com a "Nova Conta" Criada
      cy.get(selectorsList.botaoIconeCarrinho).should('be.visible').eq(0).click()
      cy.get(selectorsList.abaCarrinho).should('be.visible')
      cy.get(selectorsList.botaoFecharPedidoAbaCarrinho).should('be.visible').click()
      BasePage.espera9s()
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy="form-container"]').length) {
      cy.get('[data-cy="input-email-login"]').type(userData.login),
      cy.get('[data-cy="input-password-login"]').type(userData.password),
      cy.get('[data-cy="button-submit-login"]').click();
        }
      });
      PaymentPage.preencherEndereco();
      cy.get(selectorsList.botaoEntregaRapidaPagamento).should('be.visible').eq(0).click()
      PaymentPage.realizarPagamentoPix();
    });
  });

  context('Teste de Usuário cadastrado iniciando processo de fechamento de pedido e pagamento via Pix', () => {
    it('Inicia o pagamento via Pix para usuário cadastrado', () => {
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
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.botaoSelecionarEnderecoPagamento).eq(0).click()
    });
  });

  context('Testes dos campos obrigatórios no preenchimento do endereço de entrega', () => {
    it('Sucesso ao salvar endereço somente com Destinatário e Número', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.get(selectorsList.campoNumeroEnderecoPagamento).should('be.visible').eq(4).should('not.be.disabled').type(userData.numeroEndereco)
      cy.get(selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.iconeEnderecoAdicionadoSucesso).should('be.visible')
    });

    it('Falha ao salvar endereço sem Destinatário e sem Número', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).should('be.visible').click()
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('contain', 'Preencha os campos obrigatórios antes de enviar.');
    });

    it('Falha ao salvar endereço sem Nome do destinatário', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.get(selectorsList.campoNumeroEnderecoPagamento).should('be.visible').eq(4).should('not.be.disabled').type(userData.numeroEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('contain', 'Preencha os campos obrigatórios antes de enviar.');
    });

    it('Falha ao salvar endereço sem Número', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.get(selectorsList.campoNomeDestinatarioEnderecoPagamento).should('be.visible').type(userData.nomeDestinatarioEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('contain', 'Preencha os campos obrigatórios antes de enviar.');
    });

    it('Sucesso ao salvar endereço com destinatário e checkbox "sem número" marcada', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.get(selectorsList.semNumeroCheckBoxPagamento).should('be.visible').click()
      cy.get(selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).should('not.exist') // não deve aparecer
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('not.exist') // não deve aparecer
      cy.get(selectorsList.iconeEnderecoAdicionadoSucesso)
    });

    it('Falha ao salvar endereço com destinatário e checkbox "sem número" marcada', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.get(selectorsList.semNumeroCheckBoxPagamento).should('be.visible').click()
      cy.get(selectorsList.semNumeroCheckBoxPagamento).should('be.visible').click()
      cy.get(selectorsList.campoNumeroEnderecoPagamento).should('be.visible').should('have.value', '') // deve estar vazio
      cy.get(selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco)
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).click()
      cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('be.visible').should('contain', 'Preencha os campos obrigatórios antes de enviar.')
      cy.get(selectorsList.iconeEnderecoAdicionadoSucesso).should('not.exist') // não deve aparecer
      cy.get(selectorsList.botaoSalvarEnderecoPagamento).should('be.visible')
    });

  });
});

