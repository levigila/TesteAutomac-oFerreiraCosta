Feature: Fechamento de Pedido na Ferreira Costa com Pagamento via PIX

  Background:
    Given Eu tenho dois cenários diferentes que me dão acesso ao botão "Fechar Pedido"

  Scenario: Visualizar botão "Fechar Pedido" na aba do carrinho
    Given Estou na página inicial ou em qualquer página com o ícone do carrinho visível
    And Eu tenho pelo menos 1 produto adicionado ao carrinho
    When Eu clico no ícone do carrinho
    Then Uma aba deve aparecer sem redirecionamento
    And Eu devo visualizar o botão "Fechar Pedido" nessa aba

  Scenario: Visualizar botão "Fechar Pedido" após adicionar produto ao carrinho
    Given Eu adiciono um produto ao carrinho
    When Sou redirecionado para a página "Meu Carrinho" automaticamente
    Then Eu devo visualizar o botão "Fechar Pedido" na página "Meu Carrinho"

  Scenario: Usuário não cadastrado inicia o processo de fechamento de pedido e pagamento via Pix
    Given Sou um usuário não cadastrado e adiciono um produto ao carrinho
    And Visualizo o botão "Fechar Pedido"
    When Clico no botão "Fechar Pedido"
    And Um menu de login flutuante aparece requisitando meu login
    Then Clico em "Criar conta" no pop-up exibido
    And Realizo meu cadastro no sistema
    And Sou redirecionado para a página de pagamento
    And Preencho os dados do endereço de entrega: CEP, Cidade, Estado, Bairro, Endereço, Número, Complemento e Nome do destinatário
    And Clico em "Salvar endereço"
    And Meu endereço é salvo e selecionado automaticamente
    And A etapa de Modalidade de Entrega é liberada
    And Seleciono uma modalidade de entrega: Retirar em Loja, Rápida ou Econômica
    And A etapa de pagamento é liberada
    And Escolho Pix como método de pagamento
    And O botão "Finalizar pedido" é liberado na página
    And Clico no botão "Finalizar pedido" da página
    And Um pop-up de confirmação de pedido com outro botão "Finalizar pedido" aparece
    And Clico no botão "Finalizar Pedido" do pop-up de confirmação
   Then Sou redirecionado para a página do PIX
    And O sistema deve gerar um QR code e um código Pix para pagamento que aparecem na página
    And O pedido deve aparecer com status "Aguardando pagamento" por até 30 minutos
    And Caso não haja pagamento em até 30 minutos o pedido é cancelado

  Scenario: Usuário cadastrado inicia o processo de fechamento de pedido e pagamento via Pix
    Given Sou um usuário cadastrado adicionando um produto ao carrinho
    When Sou redirecionado para a página do "Meu carrinho" 
    And Clico no botão "Fechar Pedido"
    Then Sou redirecionado para a página de pagamento
    And Preencho os dados do endereço de entrega: CEP, Cidade, Estado, Bairro, Endereço, Número, Complemento e Nome do destinatário
    And Clico em "Salvar endereço"
    And Meu endereço é salvo e selecionado automaticamente
    And A etapa de Modalidade de Entrega é liberada
    And Seleciono uma modalidade de entrega: Retirar em Loja, Rápida ou Econômica
    And A etapa de pagamento é liberada
    And Escolho Pix como método de pagamento
    And O botão "Finalizar pedido" é liberado na página
    And Clico no botão "Finalizar pedido" da página
    And Um pop-up de confirmação de pedido com outro botão "Finalizar pedido" aparece
    And Clico no botão "Finalizar Pedido" do pop-up de confirmação
    Then Sou redirecionado para a página do PIX
    And O sistema deve gerar um QR code e um código Pix para pagamento que aparecem na página
    And O pedido deve aparecer com status "Aguardando pagamento" por até 30 minutos
    And Caso não haja pagamento em até 30 minutos o pedido é cancelado

  Scenario: Selecionar modalidade de entrega e escolher loja para retirada
    Given Sou um usuário cadastrado adicionando um produto ao carrinho
    When Sou redirecionado para a página do "Meu carrinho" 
    And Clico no botão "Fechar Pedido"
    And Sou redirecionado para a página de pagamento
    And Preencho os dados do endereço de entrega: CEP, Cidade, Estado, Bairro, Endereço, Número, Complemento e Nome do destinatário
    And Clico em "Salvar endereço"
    And Meu endereço é salvo e selecionado automaticamente
    And A etapa de Modalidade de Entrega é liberada
    And Seleciono "Retirar em Loja" como modalidade de entrega
    Then Deve aparecer um campo para selecionar a loja para retirada
    And Eu clico selecionar uma loja

  Scenario: Selecionar endereço de entrega já preenchido e salvo anteriormente
    Given Sou um usuário cadastrado que já preenchi meu endereço de entrega anteriormente
    When Adiciono um produto ao carrinho
    And Sou redirecionado para a página do "Meu carrinho"
    And Clico no botão "Fechar Pedido"
    And Sou redirecionado para a página de pagamento
    Then O(s) endereço(s) já cadastrado(s) é/são mostrado(s) na tela
    And Clico em "Selecionar endereço" no endereço que desejo

  Scenario: Erro - Preenchimento do endereço de entrega com os campos obrigatórios vazios (Destinatário e Número)
    Given Sou um usuário cadastrando um novo endereço de entrega na página de pagamento
    When Preencho o campo do CEP
    And Os campos de Número, Complemento, Ponto de referência e Nome do destinatário são liberados
    And Deixo os campos obrigatórios de Nome do destinatário e Número vazios
    And Clico no botão "Salvar Endereço"
    Then Um alerta de erro aparece 
    And O menu de preenchimento do endereço de entrega continua aberto

  Scenario: Erro - Preenchimento do endereço de entrega com o campo "Nome do destinatário" vazio
    Given Sou um usuário cadastrando um novo endereço de entrega na página de pagamento
    When Preencho o campo do CEP
    And Os campos de Número, Complemento, Ponto de referência e Nome do destinatário são liberados
    And Dos campos obrigatórios, deixo somente o campo de Nome do destinatário vazio
    And Clico no botão "Salvar Endereço"
    Then Um alerta de erro aparece 
    And O menu de preenchimento do endereço de entrega continua aberto

  Scenario: Erro - Preenchimento do endereço de entrega com o campo "Número" vazio e sem usar a checkbox "sem número"
    Given Sou um usuário cadastrando um novo endereço de entrega na página de pagamento
    When Preencho o campo do CEP
    And Os campos de Número, Complemento, Ponto de referência e Nome do destinatário são liberados
    And Dos campos obrigatórios, deixo somente o campo de Número vazio
    And Clico no botão "Salvar Endereço"
    Then Um alerta de erro aparece 
    And O menu de preenchimento do endereço de entrega continua aberto

  Scenario: Sucesso - Preenchimento do endereço de entrega sem número usando a checkbox "sem número"
    Given Sou um usuário cadastrando um novo endereço de entrega na página de pagamento
    When Preencho o campo do CEP
    And Os campos de Número, Complemento, Ponto de referência e Nome do destinatário são liberados
    And Marco a checkbox "sem número"
    And preencho o nome do destinatário
    And Clico no botão "Salvar Endereço"
    Then O menu de preenchimento do endereço de entrega se fecha
    And Nenhum alerta aparece
    And Um ícone de Sucesso aparece na linha de rolagem de etapas

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
    And O menu de preenchimento do endereço de entrega continua aberto
    And Um ícone de sucesso não deve aparecer na linha de rolagem de etapas

  

  
