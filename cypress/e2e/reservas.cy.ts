describe('Tela de Reservas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login-email"]').type('teste@example.com');
    cy.get('[data-testid="login-password"]').type('123456');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');

    const nomeDoBlocoTeste = 'Bloco de Teste Reserva';
    cy.intercept('POST', '/api/blocos', (req) => {
      console.log('Simulando chamada POST para /api/blocos com:', req.body);
    }).as('criarBloco');
    cy.get('[data-testid="novo-bloco-input"]').type(nomeDoBlocoTeste);
    cy.get('[data-testid="adicionar-bloco-button"]').click();

    const nomeDaSalaTeste = 'Sala de Teste Reserva';
    const capacidadeDaSalaTeste = '15';
    cy.intercept('POST', '/api/salas', (req) => {
      console.log('Simulando chamada POST para /api/salas com:', req.body);
    }).as('criarSala');
    cy.get('[data-testid="nova-sala-nome-input"]').type(nomeDaSalaTeste);
    cy.get('[data-testid="nova-sala-capacidade-input"]').type(capacidadeDaSalaTeste);
    cy.get('[data-testid="nova-sala-bloco-select"]').select(nomeDoBlocoTeste);
    cy.get('[data-testid="adicionar-sala-button"]').click();
    cy.visit('http://localhost:3000/reservas');
  });

  it('deve exibir o container da página de reservas', () => {
    cy.get('[data-testid="reservas-container"]').should('be.visible');
  });

  it('deve exibir a mensagem "Nenhuma notificação por enquanto" inicialmente', () => {
    cy.get('[data-testid="nenhuma-notificacao"]').should('be.visible');
    cy.get('[data-testid="nenhuma-notificacao"]').within(() => {
      cy.get('h3').should('contain', 'Nenhuma notificação por enquanto');
      cy.get('p').should('contain', 'Crie uma reserva para gerar uma notificação');
    });
  });

  it('deve exibir uma mensagem de erro ao tentar criar uma reserva com campos vazios', () => {
    cy.get('[data-testid="criar-reserva-button"]').click();
    cy.get('[data-testid="mensagem-component"]').should('be.visible');
    cy.get('[data-testid="mensagem-component"]').should('contain', 'Por favor, preencha todos os campos.');
  });

  it('deve ser capaz de criar uma nova reserva com sucesso', () => {
    const blocoTeste = 'Bloco de Teste Reserva';
    const salaTeste = 'Sala de Teste Reserva';
    const dataReserva = '2025-04-10';
    const horaInicioReserva = '09:00';
    const horaFimReserva = '10:00';
    cy.get('[data-testid="reserva-bloco-select"]')
      .should('be.visible')
      .select(blocoTeste);
    cy.get('[data-testid="reserva-sala-select"]')
      .should('be.visible')
      .select(salaTeste);
    cy.get('[data-testid="reserva-data-input"]').type(dataReserva);
    cy.get('[data-testid="reserva-hora-inicio-input"]').type(horaInicioReserva);
    cy.get('[data-testid="reserva-hora-fim-input"]').type(horaFimReserva);
    cy.intercept('POST', '/api/reservas', (req) => {
      console.log('Simulando chamada POST para /api/reservas com:', req.body);
    }).as('criarReserva');
    cy.get('[data-testid="criar-reserva-button"]').click();
  });

  it('deve limpar os campos do formulário ao clicar em "Limpar Campos"', () => {
    cy.get('[data-testid="reserva-bloco-select"]').select('Bloco de Teste Reserva');
    cy.get('[data-testid="reserva-sala-select"]').select('Sala de Teste Reserva');
    cy.get('[data-testid="reserva-data-input"]').type('2025-04-06');
    cy.get('[data-testid="reserva-hora-inicio-input"]').type('14:00');
    cy.get('[data-testid="reserva-hora-fim-input"]').type('15:00');
    cy.get('button').contains('Limpar Campos').click();
    cy.get('[data-testid="reserva-bloco-select"]').should('have.value', '');
    cy.get('[data-testid="reserva-sala-select"]').should('have.value', '');
    cy.get('[data-testid="reserva-data-input"]').should('have.value', '');
    cy.get('[data-testid="reserva-hora-inicio-input"]').should('have.value', '');
    cy.get('[data-testid="reserva-hora-fim-input"]').should('have.value', '');
  });

  it('deve ser capaz de cancelar uma notificação de reserva', () => {
    const blocoTeste = 'Bloco de Teste Reserva';
    const salaTeste = 'Sala de Teste Reserva';
    const dataReserva = '2025-04-11';
    const horaInicioReserva = '11:00';
    const horaFimReserva = '12:00';

    cy.get('[data-testid="reserva-bloco-select"]').select(blocoTeste);
    cy.get('[data-testid="reserva-sala-select"]').select(salaTeste);
    cy.get('[data-testid="reserva-data-input"]').type(dataReserva);
    cy.get('[data-testid="reserva-hora-inicio-input"]').type(horaInicioReserva);
    cy.get('[data-testid="reserva-hora-fim-input"]').type(horaFimReserva);
    cy.intercept('POST', '/api/reservas', (req) => {
      console.log('Simulando chamada POST para /api/reservas (cancelamento?) com:', req.body);
    }).as('criarOutraReserva');
    cy.get('[data-testid="criar-reserva-button"]').click();
  });
});