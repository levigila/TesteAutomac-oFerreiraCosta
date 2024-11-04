import userData from '../../fixtures/users/userData.json'
// cypress/pages/PaymentPage.js
class PaymentPage {
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
  
    preencherEndereco() {
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.wait(2000);
      cy.get(PaymentPage.selectorsList.campoNumeroEnderecoPagamento).eq(4).should('not.be.disabled').type(userData.numeroEndereco)
      cy.get(PaymentPage.selectorsList.campoNumeroEnderecoPagamento).eq(4).type(userData.numeroEndereco)
      cy.get(PaymentPage.selectorsList.campoComplementoEnderecoPagamento).type(userData.complementoEndereco)
      cy.get(PaymentPage.selectorsList.campoPontoReferenciaEnderecoPagamento).type(userData.pontoReferenciaEndereco)
      cy.get(PaymentPage.selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco)
      cy.get(PaymentPage.selectorsList.botaoSalvarEnderecoPagamento).click()
    }
    realizarPagamentoPix(){
      cy.get(PaymentPage.selectorsList.botaoPagamentoPixPagamento).click()
      cy.get(PaymentPage.selectorsList.botaoFinalizarPedidoPagamento).click()
      cy.get(PaymentPage.selectorsList.botaoConfirmacaoFinalizarPedidoPagamento).click()
      cy.wait(5000);
      cy.get(PaymentPage.selectorsList.ImagemQrCodePixPagamento)
    }
  }
  
  export default new PaymentPage();
  