// cypress/pages/CartPage.js
class CartPage {
    static selectorsList = {
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

    fecharOPedido() {
      cy.location(CartPage.selectorsList.urlField).should('equal', '/checkout/meu-carrinho')
      cy.wait(5000);
      cy.get(CartPage.selectorsList.botaoFecharPedidoPaginaCarrinho).click({force: true})
      cy.wait(2000);
    }

  }
  
  export default new CartPage();
  