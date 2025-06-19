// cypress/support/commands.js

Cypress.Commands.add('registerUser', (user) => {
  cy.visit('/cadastro');
  cy.get('[data-testid="name-input"]').type(user.name);
  cy.get('[data-testid="email-input"]').type(user.email);
  cy.get('[data-testid="password-input"]').type(user.password);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('loginUser', (user) => {
  cy.visit('/');
  cy.get('[data-testid="email-input"]').type(user.email);
  cy.get('[data-testid="password-input"]').type(user.password);
  cy.get('[data-testid="login-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
});