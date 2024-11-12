import userData from '../../fixtures/users/userData.json'
// cypress/pages/RegisterPage.js
class RegisterPage {
    static selectorsList = {
        botaoCadastrarPopUpLogin: '.Ydjie',
        botaoContinuarCadastro: '.jfWhpQ',
        campoNomeCadastro: '#name',
        campoCPFCadastro: '#cpf',
        campoEmailCadastro: '#email',
        campoCelularCadastro: '#phoneNumber',
        campoDataNascCadastro: '#birthdate',
        campoSenhaCadastro: '#password',
        campoConfirmSenhaCadastro: '#confirmPassword',
        termosCheckBoxCadastro: '#acceptedTermsUse',
        campoLoginIconePerfilEntrar: '#login',
        campoSenhaIconePerfilEntrar: '#password',
        botaoEntrarIconePerfilEntrar: '.kINcSM',
    }

    realizarCadastroUsuario() {
      cy.get(RegisterPage.selectorsList.botaoCadastrarPopUpLogin).click({force: true})
      
      cy.get(RegisterPage.selectorsList.campoNomeCadastro).type(userData.nameSuccess)
      cy.get(RegisterPage.selectorsList.campoCPFCadastro).type(userData.cpfSuccess)
      cy.get(RegisterPage.selectorsList.campoEmailCadastro).type(userData.emailSuccess)
      cy.get(RegisterPage.selectorsList.campoCelularCadastro).type(userData.phoneSuccess)
      cy.get(RegisterPage.selectorsList.campoDataNascCadastro).type(userData.birthdaySuccess)
      cy.get(RegisterPage.selectorsList.campoSenhaCadastro).type(userData.passwordSuccess)
      cy.get(RegisterPage.selectorsList.campoConfirmSenhaCadastro).type(userData.passwordSuccess)
      cy.get(RegisterPage.selectorsList.termosCheckBoxCadastro).click()
      cy.get(RegisterPage.selectorsList.botaoContinuarCadastro).click()
      
    }
    
    realizarLoginUsuario() {
      cy.get(RegisterPage.selectorsList.campoLoginIconePerfilEntrar).type(userData.login)
      cy.get(RegisterPage.selectorsList.campoSenhaIconePerfilEntrar).type(userData.password)
      cy.get(RegisterPage.selectorsList.botaoEntrarIconePerfilEntrar).click()
      
    }
  }
  
  export default new RegisterPage();
  