describe('Tela de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('deve permitir o login com credenciais válidas', () => {
    cy.get('[data-testid="login-email"]').type('teste@example.com'); 
    cy.get('[data-testid="login-password"]').type('123456'); 
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('DASHBOARD').should('be.visible');
  });

  it('deve exibir uma mensagem de erro com credenciais inválidas', () => {
    cy.get('[data-testid="login-email"]').type('email_invalido@exemplo.com');
    cy.get('[data-testid="login-password"]').type('senha_invalida');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-error-message"]').should('be.visible');
    cy.contains('Credenciais incorretas').should('be.visible');
  });

  it('deve exibir uma mensagem de erro se o e-mail estiver vazio', () => {
    cy.get('[data-testid="login-password"]').type('123456');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-error-message"]').should('be.visible');
    cy.contains('Insira os dados nos campos de e-mail e senha').should('be.visible');
  });

  it('deve exibir uma mensagem de erro se a senha estiver vazia', () => {
    cy.get('[data-testid="login-email"]').type('teste@example.com');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-error-message"]').should('be.visible');
    cy.contains('Insira os dados nos campos de e-mail e senha').should('be.visible');
  });
});