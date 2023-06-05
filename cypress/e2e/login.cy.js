/// <reference types="cypress"/>

context('Login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('user clicks login button and is redirected to login page', () => {
    cy.get('[data-testid="loginButton"]').click();
  });
});
