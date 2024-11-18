import BasePage from './pageObjects/BasePage';
import HomePage from './pageObjects/HomePage';
import RegisterPage from './pageObjects/RegisterPage';
import PaymentPage from './pageObjects/PaymentPage';
import CartPage from './pageObjects/CartPage';

///<reference types="cypress" />

describe('Testes que envolvem o Fechamento de Pedido na Ferreira Costa com Pagamento via PIX', () => {

  beforeEach(() => {
    cy.visit('/') 
  });

  context('Teste para visualizar botão "Fechar Pedido" na aba do carrinho', () => {
    it('Exibe o botão "Fechar Pedido" na aba do carrinho após adicionar produto', () => {
      HomePage.adicionarProdutoAoCarrinho();
      HomePage.visualizarBotaoFecharPedidoAbaCarrinho();
    });
  });

  context('Teste para visualizar botão "Fechar Pedido" na página do carrinho', () => {
    it('Exibe o botão "Fechar Pedido" na página "Meu Carrinho"', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.checarUrlDaPaginaDoCarrinho();
      CartPage.visualizarBotaoFecharPedidoPaginaCarrinho();
    });
  });

  context('Teste de Usuário não cadastrado iniciando processo de fechamento de pedido e pagamento via Pix', () => {
    it('Inicia o pagamento via Pix para usuário não cadastrado', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarCadastroUsuario();
      RegisterPage.fecharPopUpCodigoVerificacao();// Aqui é onde a Etapa de Verificação de Nova Conta com Código começa a ser Pulada
      RegisterPage.clicaNoBotaoEntrarNoMenuCadastro();
      HomePage.clicaNoBotaoIconePerfilNaPaginaInicial();
      RegisterPage.realizarLoginUsuario(); // Simula-se a realização de Login com a "Nova Conta" Criada
      HomePage.fecharPedidoPelaAbaCarrinho(); // Fecha Pedido para cehagr até o checkout de pagamento
      BasePage.espera9s(); 
      HomePage.confirmarLoginNovamenteCasoSistemaPeça(); //Condicional Caso o sistema peça para logar novamente
      PaymentPage.preencherEndereco(); // Já dentro da página de checkout de pagamento
      PaymentPage.escolherMetodoDeEntregaRapida(); 
      PaymentPage.realizarPagamentoPix();
    });
  });

  context('Teste de Usuário cadastrado iniciando processo de fechamento de pedido e pagamento via Pix', () => {
    it('Inicia o pagamento via Pix para usuário cadastrado', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherEndereco();
      PaymentPage.escolherMetodoDeEntregaEconomica();
      PaymentPage.realizarPagamentoPix();
    });
  });

  context('Teste de modalidade de entrega escolhendo loja para retirada', () => {
    it('Seleciona modalidade "Retirar em Loja" e escolhe a loja', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherEndereco();
      PaymentPage.escolherMetodoDeRetirarNaLoja();
      PaymentPage.escolherLojaParaRetirarPedido();
    });
  });

  context('Teste de endereço de entrega escolhendo endereço salvo anteriormente', () => {
    it('Seleciona um endereço de entrega já salvo', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.escolherEnderecoSalvoAnteriormente();
    });
  });

  context('Testes dos campos obrigatórios no preenchimento do endereço de entrega', () => {
    it('Sucesso ao salvar endereço somente com Destinatário e Número', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherCamposObrigatoriosDoEndereco();
      PaymentPage.clicarBotaoSalvarEndereco();
      PaymentPage.verificarSucessoNoSalvarEndereco();
    });

    it('Falha ao salvar endereço sem Destinatário e sem Número', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherCamposObrigatoriosSemDestinatarioENumero();
      PaymentPage.clicarBotaoSalvarEndereco();
      PaymentPage.verificarAparecimentoMensagemDeErroCamposObrigatorios();
    });

    it('Falha ao salvar endereço sem Nome do destinatário', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherCamposObrigatoriosSemDestinatario();
      PaymentPage.clicarBotaoSalvarEndereco();
      PaymentPage.verificarAparecimentoMensagemDeErroCamposObrigatorios();
    });

    it('Falha ao salvar endereço sem Número', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherCamposObrigatoriosSemNumero();
      PaymentPage.clicarBotaoSalvarEndereco();
      PaymentPage.verificarAparecimentoMensagemDeErroCamposObrigatorios();
    });

    it('Sucesso ao salvar endereço com destinatário e checkbox "sem número" marcada', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherCampoDoCEP();
      PaymentPage.clicarNaCheckBoxSemNumero();
      PaymentPage.preencherCampoDestinatario();
      PaymentPage.clicarBotaoSalvarEndereco();
      PaymentPage.verificarDesaparecimentoDoBotaoSalvarEndereco(); // Não deve aparecer, o que significa que passou(como esperado)
      PaymentPage.verificarDesaparecimentoMensagemDeErroCamposObrigatorios(); // Não deve aparecer, o que significa que passou(como esperado)
      PaymentPage.verificarAparecimentoIconeDeSucessoNoCadastro(); // Deve aparecer, o que significa
    });

    it('Falha ao salvar endereço com destinatário e checkbox "sem número" marcada', () => {
      HomePage.adicionarProdutoAoCarrinho();
      CartPage.fecharOPedido();
      RegisterPage.realizarLoginUsuario();
      PaymentPage.preencherCampoDoCEP();
      PaymentPage.clicarNaCheckBoxSemNumero(); // Marca a CheckBox
      PaymentPage.clicarNaCheckBoxSemNumero(); // Desmarca a CheckBox
      PaymentPage.verificarSeCampoNumeroDoEnderecoEstaVazio(); // Deve estar vazio
      PaymentPage.preencherCampoDestinatario();
      PaymentPage.clicarBotaoSalvarEndereco();
      PaymentPage.verificarAparecimentoMensagemDeErroCamposObrigatorios(); // Deve aparecer, o que significa que não passou(como esperado)
      PaymentPage.verificarAusenciaDoIconeDeSucessoNoCadastro(); // Deve estar ausente, o que significa que não passou(como esperado)
      PaymentPage.verificarPermanenciaDoBotaoSalvarEndereco(); // Deve permanecer visível, o que significa que não passou para outra etapa (como esperado)
    });

  });
});

