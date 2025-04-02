describe('Dashboard', () => {
  beforeEach(() => {

    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login-email"]').type('teste@example.com');
    cy.get('[data-testid="login-password"]').type('123456');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');


    localStorage.clear();
  });

  it('deve exibir o container do dashboard', () => {
    cy.get('[data-testid="dashboard-container"]').should('be.visible');
  });

  it('deve exibir a mensagem "Nenhum bloco ou sala cadastrado" inicialmente', () => {
    cy.get('[data-testid="nenhum-item-cadastrado"]').should('be.visible');
    cy.get('[data-testid="nenhum-item-cadastrado"]').within(() => {
      cy.get('h3').should('contain', 'Nenhum bloco ou sala cadastrado');
      cy.get('p').should('contain', 'Adicione as salas para visualizá-los aqui');
    });
  });

  it('deve ser capaz de adicionar um novo bloco', () => {
    const nomeDoBloco = 'Bloco A';
    cy.get('[data-testid="novo-bloco-input"]').type(nomeDoBloco);
    cy.get('[data-testid="adicionar-bloco-button"]').click();
    cy.get('[data-testid="mensagem-container"]').should('contain', 'Bloco adicionado com sucesso!');
    cy.wait(500);
    cy.get(`[data-testid="bloco-card-${nomeDoBloco.toLowerCase().replace(/\s+/g, '-')}"]`).should('be.visible');
  });

  it('deve exibir uma mensagem de erro se o nome do bloco estiver vazio', () => {
    cy.get('[data-testid="adicionar-bloco-button"]').click();
    cy.get('[data-testid="mensagem-container"]').should('contain', 'Por favor, digite o nome do bloco.');
  });

  it('deve ser capaz de adicionar uma nova sala a um bloco', () => {
    const nomeDoBloco = 'Bloco B';
    cy.get('[data-testid="novo-bloco-input"]').type(nomeDoBloco);
    cy.get('[data-testid="adicionar-bloco-button"]').click();
    cy.wait(500);

    const nomeDaSala = 'Sala 101';
    const capacidadeDaSala = '30';
    cy.get('[data-testid="nova-sala-nome-input"]').type(nomeDaSala);
    cy.get('[data-testid="nova-sala-capacidade-input"]').type(capacidadeDaSala);
    cy.get('[data-testid="nova-sala-bloco-select"]').select(nomeDoBloco);
    cy.get('[data-testid="adicionar-sala-button"]').click();
    cy.get('[data-testid="mensagem-container"]').should('contain', 'Sala adicionada com sucesso!');

    cy.wait(500);
    cy.get(`[data-testid="bloco-card-${nomeDoBloco.toLowerCase().replace(/\s+/g, '-')}"]`).within(() => {
      cy.contains(nomeDaSala).should('be.visible');
      cy.contains(capacidadeDaSala).should('be.visible');
    });
  });

  it('deve exibir uma mensagem de erro se os campos da sala estiverem vazios', () => {
    cy.get('[data-testid="adicionar-sala-button"]').click();
    cy.get('[data-testid="mensagem-container"]').should('contain', 'Por favor, preencha todos os campos da sala.');
  });

  it('deve exibir os inputs de data e hora', () => {
    cy.get('input[type="date"]').should('be.visible');
    cy.get('input[type="time"]').should('be.visible');
  });

});