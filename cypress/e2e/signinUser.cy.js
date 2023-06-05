/// <reference types="cypress"/>

// Please change emailLinkFromEmulator variable after you have performed the e2e sendMagicLink test
// and replace the emailLinkFromEmulator variable with
// the email link that is logged in the console

const emailLinkFromEmulator = '';

context('sign in user', () => {
  beforeEach(() => {
    cy.visit(emailLinkFromEmulator);

    localStorage.setItem('emailForSignIn', 'test@gmail.com');
  });

  it('should sign in user', () => {
    expect(localStorage.getItem('emailForSignIn')).to.eq('test@gmail.com');

    cy.get('p').should('contain', 'signing you in');

    cy.get('h1').should(
      'not.contain',
      'Oops! The magic link has expired or is invalid. Please sign in to request a new link.'
    );
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
