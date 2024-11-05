# Bug Report

## Título
**Erro ao salvar endereço quando a checkbox "sem número" é desmarcada e campo "Número" permanece vazio**

---

## Passos para Reprodução
1. Acessar a página de pagamento do site Ferreira Costa.
2. Preencher o campo de CEP com um valor válido.
3. Marcar a checkbox "sem número", que desabilita o campo "Número".
4. Desmarcar a checkbox "sem número".
5. Verificar o campo "Número" (espera-se que esteja vazio, mas ele contém um zero).
6. Preencher o campo "Nome do destinatário" com um valor válido.
7. Clicar no botão "Salvar endereço".

---

## Resultado Esperado
- O campo "Número" deveria estar vazio após desmarcar a checkbox "sem número".
- O sistema deve alertar o usuário que o campo "Número" é obrigatório ao clicar em "Salvar endereço" (`Preencha os campos obrigatórios antes de enviar`).
- Nenhum ícone de sucesso deve ser exibido enquanto há erros nos campos obrigatórios ou eles estão vazios.
- O menu de preenchimento do endereço deve permanecer aberto.

---

## Resultado Encontrado
- O campo "Número" recebe um valor "0" após desmarcar a checkbox "sem número".
- Ao tentar salvar o endereço com o campo "Número" contendo "0" e o campo "Nome do destinatário" preenchido, o sistema exibe uma borda vermelha no campo "Número" (indicando que o campo está em erro).
- Um ícone de sucesso é exibido na linha de rolagem de etapas, indicando que o endereço foi salvo.
- Mesmo com o alerta de campo obrigatório, o sistema salva o endereço como "S/N", e o menu de preenchimento do endereço se fecha automaticamente, indicando erroneamente que o processo foi concluído.

---

## Ambiente de Testes
- **Ambiente**: Produção
- **URL**: [https://www.ferreiracosta.com/checkout/pagamento](https://www.ferreiracosta.com/checkout/pagamento)
- **Data do Teste**: 05/11/2024
- **Navegador**: Google Chrome
- **Sistema Operacional**: Windows 11 Home Single Language, Sistema operacional de 64 bits.

---

## Prioridade
**Alta**

## Tipo de Bug
**Funcional**

---

## Evidências

### Cenário em Gherkin

```gherkin
Scenario: Erro - Desmarcar a checkbox "sem número", preencher o destinatário e salvar
  Given Sou um usuário cadastrando um novo endereço de entrega na página de pagamento
  And Preencho o campo de CEP
  And Os campos de Número, Complemento, Ponto de referência e Nome do destinatário são liberados
  When Marco a checkbox "sem número"
  And Desmarco a checkbox "sem número"
  Then O campo de número deve estar vazio
  When Preencho o nome do destinatário
  And Clico em salvar o endereço
  Then O sistema deve emitir um alerta informando que o número é obrigatório
  And Um ícone de sucesso não deve aparecer na linha de rolagem de etapas
  And O menu de preenchimento do endereço de entrega continua aberto
```
## Vídeo
Link: https://screenrec.com/share/tucIAkQKXz 

## Script de Automação em Cypress

```bash
it.only('Falha ao salvar endereço com destinatário e checkbox "sem número" marcada', () => {
  BasePage.espera2s();
  HomePage.adicionarProdutoAoCarrinho();
  CartPage.fecharOPedido();
  RegisterPage.realizarLoginUsuario();
  cy.get(selectorsList.campoCepEnderecoPagamento).type(userData.enderecoCEP);
  BasePage.espera5s();
  cy.get(selectorsList.semNumeroCheckBoxPagamento).click();
  BasePage.espera5s();
  cy.get(selectorsList.semNumeroCheckBoxPagamento).click();
  BasePage.espera5s();
  cy.get(selectorsList.campoNumeroEnderecoPagamento).should('have.value', '');
  cy.get(selectorsList.campoNomeDestinatarioEnderecoPagamento).type(userData.nomeDestinatarioEndereco);
  cy.get(selectorsList.botaoSalvarEnderecoPagamento).click();
  cy.get(selectorsList.alertarDeErroCamposObrigatorios).should('contain', 'Preencha os campos obrigatórios antes de enviar.');
  BasePage.espera3s();
  cy.get(selectorsList.iconeEnderecoAdicionadoSucesso).should('not.exist');
  cy.get(selectorsList.botaoSalvarEnderecoPagamento).should('be.visible');
});
```
