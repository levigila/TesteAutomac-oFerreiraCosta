// cypress/pages/CartPage.js
class CartPage {
    static selectorsList = {
        urlField: 'pathname',
        botaoFecharPedidoPaginaCarrinho: '.ImePp',
        
    }

    fecharOPedido() {
      cy.location(CartPage.selectorsList.urlField).should('equal', '/checkout/meu-carrinho');
      
      cy.get(CartPage.selectorsList.botaoFecharPedidoPaginaCarrinho).click({force: true});
      
    }

    checarUrlDaPaginaDoCarrinho() {
      cy.location(CartPage.selectorsList.urlField).should('equal', '/checkout/meu-carrinho');
    }

    visualizarBotaoFecharPedidoPaginaCarrinho() {
      cy.get(CartPage.selectorsList.botaoFecharPedidoPaginaCarrinho).should('be.visible');
    }
  }
  
  export default new CartPage();
  
  