import { adicionarBloco, adicionarReserva, adicionarSala } from '../../src/services/api';

describe('Tela de Relatórios', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login-email"]').type('teste@example.com');
    cy.get('[data-testid="login-password"]').type('123456');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('deve acessar a página de relatórios corretamente com dados criados', () => {
    localStorage.clear();
    const criarDadosDeTeste = async () => {
      const blocoA = await adicionarBloco('Bloco A');
      const blocoB = await adicionarBloco('Bloco B');
      const sala101A = await adicionarSala('Sala 101', 20, blocoA.id);
      const sala202B = await adicionarSala('Sala 202', 30, blocoB.id);

      await adicionarReserva(blocoA.id, blocoA.nome, sala101A.id, sala101A.nome, '2025-04-07', '09:00', '10:00');
      await adicionarReserva(blocoB.id, blocoB.nome, sala202B.id, sala202B.nome, '2025-04-07', '14:00', '15:00');
      await adicionarReserva(blocoA.id, blocoA.nome, sala101A.id, sala101A.nome, '2025-04-08', '10:00', '11:00');
    };

    cy.wrap(criarDadosDeTeste()).then(() => {
      cy.visit('http://localhost:3000/relatorios');
      cy.url().should('include', '/relatorios');
      cy.wait(5000);
    });
  });

  it('deve acessar a página de relatórios corretamente sem dados criados', () => {
    localStorage.clear();
    cy.visit('http://localhost:3000/relatorios');
    cy.url().should('include', '/relatorios');
    cy.wait(3000);
  });
});