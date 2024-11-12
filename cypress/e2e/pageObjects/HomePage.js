// cypress/pages/HomePage.js
class HomePage {
    static selectorsList = {
        botaoCookie: '[data-cy="button-close-modal-cookie"]',
        produtoEscolhido: '.cmIHMY', // eq(0)
        adicionarAoCarrinho: '.ZtenW', // eq(0)
        botaoVoltagemContinuar: '[data-cy="modal-voltage-button-success"]'
    }

    adicionarProdutoAoCarrinho() {
      cy.get(HomePage.selectorsList.botaoCookie).click()
      cy.scrollTo(0, 500);
      cy.get(HomePage.selectorsList.produtoEscolhido).eq(0).click({force: true})
      cy.scrollTo(0, 500);
      cy.get(HomePage.selectorsList.adicionarAoCarrinho).should('be.visible').eq(0).click()
      cy.wait(4000);
      cy.get('body').then(($body) => {
        if ($body.find(HomePage.selectorsList.botaoVoltagemContinuar).length) {
            cy.get(HomePage.selectorsList.botaoVoltagemContinuar).click({ force: true });
        }
    });
    }
  }
  
  export default new HomePage();

  
  