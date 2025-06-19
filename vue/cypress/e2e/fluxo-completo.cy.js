describe('SUPPLY AI - Testes E2E', () => {
  const testUser = {
    name: "Test User",
    email: `test_${Date.now()}@example.com`,
    password: "Test@1234"
  };

  const selectors = {
    nameInput: '[data-testid="name-input"]',
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    registerButton: '[data-testid="submit-button"]',
    loginButton: '[data-testid="login-button"]',
    alertSection: '[data-testid="alertas-section"]',
    welcomeMessage: 'h1',
    alertItems: '[data-testid="alert-item"]'
  };

  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.clear();
        win.sessionStorage.clear();
      }
    });
  });

  context('1. User Registration Flow', () => {
    it('should successfully register a new user', () => {
      cy.visit('/cadastro');
      cy.get(selectors.nameInput).type(testUser.name);
      cy.get(selectors.emailInput).type(testUser.email);
      cy.get(selectors.passwordInput).type(testUser.password);
      cy.get(selectors.registerButton).click();
    });
  });


  context('4. Error Cases', () => {
    it('should show error for invalid login', () => {
      cy.get(selectors.emailInput).type('invalid@email.com');
      cy.get(selectors.passwordInput).type('wrongpassword');
      cy.get(selectors.loginButton).click();
    });

    it('should show error for weak password', () => {
      cy.visit('/cadastro');
      cy.get(selectors.nameInput).type('Weak Password User');
      cy.get(selectors.emailInput).type('weak@example.com');
      cy.get(selectors.passwordInput).type('123456');
      cy.get(selectors.registerButton).click();
    });
  });
});