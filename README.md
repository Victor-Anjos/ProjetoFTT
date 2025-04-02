# UniEVANGÉLICA - Sistema de Gerenciamento de Reservas de Salas Acadêmicas

Este projeto consiste em uma interface web para o sistema de gerenciamento de reservas de salas acadêmicas da UniEVANGÉLICA. O objetivo é permitir que coordenadores de curso visualizem e reservem espaços de forma eficiente, interagindo com uma API RESTful.

## Tecnologias Utilizadas

* **React com TypeScript**: Para o desenvolvimento do frontend.
* **CSS Modules**: Para estilização, seguindo o modelo BEM do CSS.
* **React Router**: Para roteamento e navegação entre as páginas.
* **LocalStorage**: Simulação da API RESTful para testes das funcionalidades.
* **Cypress**: Para testes end-to-end (funcionalidade bônus).
* **Autenticação JWT**: Implementada para manter o usuário logado por um período de tempo.

## Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/Victor-Anjos/ProjetoFTT.git
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd ProjetoFTT
    ```

3.  Instale as dependências:

    ```bash
    npm install
    ```

## Uso

1.  Inicie a aplicação:

    ```bash
    npm start
    ```

2.  Acesse a página de login no seu navegador:

    ```
    localhost:3000/login
    ```

3.  Utilize as seguintes credenciais para login:
    * Email: `teste@example.com`
    * Senha: `123456`

4.  Após o login, você será redirecionado para o dashboard (`localhost:3000/dashboard`), onde poderá:
    * Criar blocos e salas.
    * Visualizar blocos e salas existentes.
    * Filtrar informações de blocos e salas.
    * Visualizar salas que estão livre e ocupadas.

5.  Acesse a tela de reservas (`localhost:3000/reservas`) para criar novas reservas, selecionando blocos, salas, data e horário.

6.  Visualize as notificações de reservas e cancele reservas, se necessário.

7.  Analise os gráficos de utilização de salas na tela de relatórios (`localhost:3000/relatorios`).

## Testes

* Para executar os testes end-to-end com Cypress:

    1.  Abra o Cypress:

        ```bash
        npx cypress open
        ```

    2.  Na interface do Cypress, você verá uma lista de arquivos de teste (geralmente localizados na pasta `cypress/e2e`).
    3.  Clique no arquivo de teste que deseja executar. O Cypress abrirá uma nova janela do navegador e executará os testes automaticamente, mostrando o progresso e os resultados em tempo real.
    4.  Observe os resultados dos testes para garantir que todas as funcionalidades estejam funcionando corretamente.