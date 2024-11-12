import userData from '../../fixtures/users/userData.json'
// cypress/pages/PaymentPage.js
class PaymentPage {
    static selectorsList = {
        campoCepEnderecoPagamento: '#zipCode',
        campoNumeroEnderecoPagamento: '.dcICvc', //eq(4)
        campoComplementoEnderecoPagamento: '#addressComplement',
        campoPontoReferenciaEnderecoPagamento: '#referencePoint',
        campoNomeDestinatarioEnderecoPagamento: '#recipient',
        botaoSalvarEnderecoPagamento: '.hfarrR',
        botaoPagamentoPixPagamento: '#optionPaymentPix',
        botaoFinalizarPedidoPagamento: '.eVFsmM',
        botaoConfirmacaoFinalizarPedidoPagamento: '.jfWhpQ',
        ImagemQrCodePixPagamento: '[data-cy="pix-payment-qr-code-image"]',
    }
  
    preencherEndereco() {
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP)
      cy.wait(4000);
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
      cy.get(PaymentPage.selectorsList.ImagemQrCodePixPagamento)
    }
  }
  
  export default new PaymentPage();
  