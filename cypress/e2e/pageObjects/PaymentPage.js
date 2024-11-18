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
        iconeEnderecoAdicionadoSucesso: "[aria-label='concluido']",
        alertarDeErroCamposObrigatorios: '[data-cy="title-toast"]',
        semNumeroCheckBoxPagamento: '#noNumber',
        botaoSelecionarEnderecoPagamento: '.bZCHgE', // eq(0)
        botaoSelecionarLojaRetiradaPagamento: '.dIFnry', // eq(1) Quando Retirar em Loja é selecionado
        botaoEntregaRapidaPagamento: '.dDonWj', //eq(0)
        botaoEntregaEconomicaPagamento: '.dDonWj', //eq(1)
        botaoRetirarNaLojaPagamento: '.eNvxiQ',
    }
  
    preencherEndereco() {
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP);
      cy.wait(4000);
      cy.get(PaymentPage.selectorsList.campoNumeroEnderecoPagamento).should('be.visible').eq(4).should('not.be.disabled').type(userData.numeroEndereco);
      cy.get(PaymentPage.selectorsList.campoNumeroEnderecoPagamento).eq(4).type(userData.numeroEndereco);
      cy.get(PaymentPage.selectorsList.campoComplementoEnderecoPagamento).type(userData.complementoEndereco);
      cy.get(PaymentPage.selectorsList.campoPontoReferenciaEnderecoPagamento).type(userData.pontoReferenciaEndereco);
      cy.get(PaymentPage.selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco);
      cy.get(PaymentPage.selectorsList.botaoSalvarEnderecoPagamento).click();
    }
    realizarPagamentoPix(){
      cy.get(PaymentPage.selectorsList.botaoPagamentoPixPagamento).click();
      cy.get(PaymentPage.selectorsList.botaoFinalizarPedidoPagamento).click();
      cy.get(PaymentPage.selectorsList.botaoConfirmacaoFinalizarPedidoPagamento).click();
      cy.get(PaymentPage.selectorsList.ImagemQrCodePixPagamento).should('be.visible');
    }
    escolherMetodoDeEntregaRapida(){
      cy.get(PaymentPage.selectorsList.botaoEntregaRapidaPagamento).should('be.visible').eq(0).click();
    }
    escolherMetodoDeEntregaEconomica(){
      cy.get(PaymentPage.selectorsList.botaoEntregaEconomicaPagamento).eq(1).click();
    }
    escolherMetodoDeRetirarNaLoja(){
      cy.get(PaymentPage.selectorsList.botaoRetirarNaLojaPagamento).click();
  }
    escolherLojaParaRetirarPedido(){
      cy.get(PaymentPage.selectorsList.botaoSelecionarLojaRetiradaPagamento).eq(1).click();
    }
    escolherEnderecoSalvoAnteriormente(){
      cy.get(PaymentPage.selectorsList.botaoSelecionarEnderecoPagamento).eq(0).click();
    }
    preencherCampoDoCEP(){
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP);
    }
    preencherCampoDestinatario(){
      cy.get(PaymentPage.selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco);
    }
    preencherCamposObrigatoriosDoEndereco(){
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP);
      cy.wait(4000);
      cy.get(PaymentPage.selectorsList.campoNumeroEnderecoPagamento).should('be.visible').eq(4).should('not.be.disabled').type(userData.numeroEndereco);
      cy.get(PaymentPage.selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco);
    }
    preencherCamposObrigatoriosSemDestinatarioENumero(){
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP);
    }
    preencherCamposObrigatoriosSemDestinatario(){
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP);
      cy.wait(4000);
      cy.get(PaymentPage.selectorsList.campoNumeroEnderecoPagamento).should('be.visible').eq(4).should('not.be.disabled').type(userData.numeroEndereco);
    }
    preencherCamposObrigatoriosSemNumero(){
      cy.get(PaymentPage.selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP);
      cy.get(PaymentPage.selectorsList.campoNomeDestinatarioEnderecoPagamento).should('be.visible').type(userData.nomeDestinatarioEndereco);
    }
    clicarBotaoSalvarEndereco(){
      cy.get(PaymentPage.selectorsList.botaoSalvarEnderecoPagamento).should('be.visible').click();
    }
    clicarNaCheckBoxSemNumero(){
      cy.get(PaymentPage.selectorsList.semNumeroCheckBoxPagamento).should('be.visible').click();
    }
    verificarSucessoNoSalvarEndereco(){
      cy.get(PaymentPage.selectorsList.iconeEnderecoAdicionadoSucesso).should('be.visible');
    }
    verificarAparecimentoMensagemDeErroCamposObrigatorios(){
      cy.get(PaymentPage.selectorsList.alertarDeErroCamposObrigatorios).should('be.visible').should('contain', 'Preencha os campos obrigatórios antes de enviar.');
    }
    verificarDesaparecimentoDoBotaoSalvarEndereco(){
      cy.get(PaymentPage.selectorsList.botaoSalvarEnderecoPagamento).should('not.exist');
    }
    verificarDesaparecimentoMensagemDeErroCamposObrigatorios(){
      cy.get(PaymentPage.selectorsList.alertarDeErroCamposObrigatorios).should('not.exist');
    }
    verificarAparecimentoIconeDeSucessoNoCadastro(){
      cy.get(PaymentPage.selectorsList.iconeEnderecoAdicionadoSucesso);
    }
    verificarSeCampoNumeroDoEnderecoEstaVazio(){
      cy.get(PaymentPage.selectorsList.campoNumeroEnderecoPagamento).should('be.visible').should('have.value', '');
    }
    verificarAusenciaDoIconeDeSucessoNoCadastro(){
      cy.get(PaymentPage.selectorsList.iconeEnderecoAdicionadoSucesso).should('not.exist');
    }
    verificarPermanenciaDoBotaoSalvarEndereco(){
      cy.get(PaymentPage.selectorsList.botaoSalvarEnderecoPagamento).should('be.visible');
    }
}
  export default new PaymentPage();
  
  

