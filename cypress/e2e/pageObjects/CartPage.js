// cypress/pages/CartPage.js
class CartPage {
    static selectorsList = {
        urlField: 'pathname',
        botaoFecharPedidoPaginaCarrinho: '.ImePp'
    }

    fecharOPedido() {
      cy.location(CartPage.selectorsList.urlField).should('equal', '/checkout/meu-carrinho')
      
      cy.get(CartPage.selectorsList.botaoFecharPedidoPaginaCarrinho).click({force: true})
      
    }

  }
  
  export default new CartPage();
  