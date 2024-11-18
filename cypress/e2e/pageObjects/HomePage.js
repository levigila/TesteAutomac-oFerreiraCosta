import userData from '../../fixtures/users/userData.json'
// cypress/pages/HomePage.js
class HomePage {
    static selectorsList = {
        botaoCookie: '[data-cy="button-close-modal-cookie"]',
        produtoEscolhido: '.cmIHMY', // eq(0)
        adicionarAoCarrinho: '.ZtenW', // eq(0)
        botaoVoltagemContinuar: '[data-cy="modal-voltage-button-success"]',
        botaoIconeCarrinho: '.cart-btn', // eq(0)
        abaCarrinho: '.bFLTtb',
        botaoFecharPedidoAbaCarrinho: '.ePqaHx',
        botaoIconePerfilEntrar: '.jDFuAe',
        formularioConfirmacaoDeLogin: '[data-cy="form-container"]',
        campoLoginConfirmacaoDeLogin: '[data-cy="input-email-login"]',
        campoSenhaConfirmacaoDeLogin: '[data-cy="input-password-login"]',
        botaoConfirmacaoDeLogin: '[data-cy="button-submit-login"]'

    }

    adicionarProdutoAoCarrinho() {
      cy.get(HomePage.selectorsList.botaoCookie).click();
      cy.scrollTo(0, 500);
      cy.get(HomePage.selectorsList.produtoEscolhido).eq(9).click({force: true});
      cy.scrollTo(0, 500);
      cy.get(HomePage.selectorsList.adicionarAoCarrinho).should('be.visible').eq(0).click();
      cy.wait(4000);
      cy.get('body').then(($body) => {
        if ($body.find(HomePage.selectorsList.botaoVoltagemContinuar).length) {
            cy.get(HomePage.selectorsList.botaoVoltagemContinuar).click({ force: true });
        }
    });
    }
    visualizarBotaoFecharPedidoAbaCarrinho() {
      cy.get(HomePage.selectorsList.botaoIconeCarrinho).eq(0).click();
      cy.get(HomePage.selectorsList.abaCarrinho).should('be.visible');
      cy.get(HomePage.selectorsList.botaoFecharPedidoAbaCarrinho).should('be.visible');
    }
    clicaNoBotaoIconePerfilNaPaginaInicial() {
    cy.get(HomePage.selectorsList.botaoIconePerfilEntrar).should('be.visible').click();
    }
    fecharPedidoPelaAbaCarrinho() {
      cy.get(HomePage.selectorsList.botaoIconeCarrinho).should('be.visible').eq(0).click();
      cy.get(HomePage.selectorsList.abaCarrinho).should('be.visible');
      cy.get(HomePage.selectorsList.botaoFecharPedidoAbaCarrinho).should('be.visible').click();
    }
    confirmarLoginNovamenteCasoSistemaPeça() {
      cy.get('body').then(($body) => { 
        if ($body.find(HomePage.selectorsList.formularioConfirmacaoDeLogin).length) {
      cy.get(HomePage.selectorsList.campoLoginConfirmacaoDeLogin).type(userData.login),
      cy.get(HomePage.selectorsList.campoSenhaConfirmacaoDeLogin).type(userData.password),
      cy.get(HomePage.selectorsList.botaoConfirmacaoDeLogin).click();
        }
      });
    }
  }

  
  export default new HomePage();

  

  
  