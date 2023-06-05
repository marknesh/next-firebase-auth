describe('Firebase Email Link Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin');
  });

  it('should send an email link', () => {
    // Enter an email address
    cy.get('[data-testid="email"]').type('test@gmail.com');

    // Click on the "Send Link" button
    cy.get('[data-testid="sendMagicLink"]').click();

    cy.url().should('include', '/checkEmail');
  });
});
