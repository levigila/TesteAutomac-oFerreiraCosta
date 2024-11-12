// cypress/pages/BasePage.js
class BasePage {
    static scrollParaBaixo() {
        cy.scrollTo(0, 500);
    }
    static espera9s() {
        cy.wait(9000);
    }
    static espera5s() {
        cy.wait(5000);
    }
    static espera4s() {
        cy.wait(2000);
    }
    static espera3s() {
        cy.wait(3000);
    }
    static espera2s() {
        cy.wait(2000);
    }

}

export default BasePage;
