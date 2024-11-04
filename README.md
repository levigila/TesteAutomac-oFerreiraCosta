# Projeto de Testes Automatizados com Cypress

Este projeto contém testes automatizados para o processo de fechamento de pedido na Ferreira Costa, com foco no pagamento via PIX. Utilizei o framework [Cypress](https://www.cypress.io/) para criar e executar os testes de ponta a ponta.

## Estrutura do Projeto

O projeto está organizado seguindo o padrão de **Page Objects**, que ajuda a manter o código limpo e modular. Cada página do aplicativo é representada por uma classe, que encapsula os seletores e métodos de interação com a interface do usuário.

### Page Objects

- **HomePage.js**: Contém métodos para interações na página inicial, como fechar o modal de cookies, selecionar um produto e adicionar ao carrinho.
- **CartPage.js**: Inclui métodos para abrir o carrinho e prosseguir com o checkout.
- **LoginPage.js**: Oferece métodos para lidar com o login e registro de usuários.
- **CheckoutPage.js**: Abrange métodos para inserir detalhes de endereço, selecionar opções de entrega e finalizar pedidos.

### Cenários de Teste

Os cenários de teste foram definidos usando a linguagem **Gherkin**, que permite descrever casos de teste em um formato mais legível. Isso facilita a compreensão dos testes por qualquer membro da equipe, mesmo aqueles sem conhecimento técnico profundo.

#### Exemplo de Cenário em Gherkin

```gherkin
Funcionalidade: Fechamento de Pedido com Pagamento via PIX

  Cenário: Usuário não cadastrado inicia o pagamento via Pix
    Dado que o usuário não está logado
    E o usuário acessa a página inicial
    Quando o usuário seleciona um produto e adiciona ao carrinho
    E prossegue para o checkout
    Então o usuário deve ser capaz de se registrar
    E completar o pagamento via PIX
```

## Executando os Testes

Para executar os testes, siga as etapas abaixo:

1. **Instale as dependências**:

   ```bash
   npm install
  ``
2. **Execute os testes no modo Headless:**
```bash
npx cypress run
````
2.1 **Ou Execute os testes no modo Interativo:**
```bash
npx cypress open
```
## Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.


