/// <reference types="cypress"/>

context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should find our home page and it should have a login button', () => {
    cy.get('h1').contains('Next.js 13 Firebase Auth Starter Template');
    cy.get('[data-testid="loginButton"]').should('be.visible');
  });
});
