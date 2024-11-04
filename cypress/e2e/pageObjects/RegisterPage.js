import userData from '../../fixtures/users/userData.json'
// cypress/pages/RegisterPage.js
class RegisterPage {
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

    realizarCadastroUsuario() {
      cy.get(RegisterPage.selectorsList.botaoCadastrarPopUpLogin).click({force: true})
      cy.wait(2000);
      cy.get(RegisterPage.selectorsList.campoNomeCadastro).type(userData.nameSuccess)
      cy.get(RegisterPage.selectorsList.campoCPFCadastro).type(userData.cpfSuccess)
      cy.get(RegisterPage.selectorsList.campoEmailCadastro).type(userData.emailSuccess)
      cy.get(RegisterPage.selectorsList.campoCelularCadastro).type(userData.phoneSuccess)
      cy.get(RegisterPage.selectorsList.campoDataNascCadastro).type(userData.birthdaySuccess)
      cy.get(RegisterPage.selectorsList.campoSenhaCadastro).type(userData.passwordSuccess)
      cy.get(RegisterPage.selectorsList.campoConfirmSenhaCadastro).type(userData.passwordSuccess)
      cy.get(RegisterPage.selectorsList.termosCheckBoxCadastro).click()
      cy.get(RegisterPage.selectorsList.botaoContinuarCadastro).click()
      cy.wait(2000);
    }
    
    realizarLoginUsuario() {
      cy.get(RegisterPage.selectorsList.campoLoginIconePerfilEntrar).type(userData.login)
      cy.get(RegisterPage.selectorsList.campoSenhaIconePerfilEntrar).type(userData.password)
      cy.get(RegisterPage.selectorsList.botaoEntrarIconePerfilEntrar).click()
      cy.wait(5000);
    }
  }
  
  export default new RegisterPage();
  