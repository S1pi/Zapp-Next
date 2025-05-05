describe('Login Test Suite', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/auth/login');
  });

  it('Visits the Login Page', () => {
    // Ensure the page is loaded
    cy.url().should('include', '/auth/login');
  });

  it('Checks if the login form is displayed', () => {
   
    cy.get('input[name="email_or_phone"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });
});

// it('Logs in successfully with valid credentials', () => {
//   cy.get('input[name="email_or_phone"]').type('emailaddress');
//   cy.get('input[name="password"]').type('password123');
//   cy.get('form').submit();
//   cy.url().should('include', '/dashboard');
// });

// it('Shows an error for invalid credentials', () => {
//   cy.get('input[name="email_or_phone"]').type('wronguser@example.com');
//   cy.get('input[name="password"]').type('wrongpassword');
//   cy.get('form').submit();
//   cy.get('.error-message').should('contain', 'Username or password is incorrect');
// });

//with data id
// describe('Login Test Suite', () => {
//   beforeEach(() => {
//     // Visit the login page before each test
//     cy.visit('/auth/login');
//   });

//   it('Checks if the login form is displayed', () => {
//     // Use data-* attributes to target elements
//     cy.get('[data-id="login-form"]').should('be.visible');
//     cy.get('[data-id="email-input"]').should('exist');
//     cy.get('[data-id="password-input"]').should('exist');
//   });

//   it('Validates form submission', () => {
//     // Fill out and submit the form
//     cy.get('[data-id="email-input"]').type('testuser@example.com');
//     cy.get('[data-id="password-input"]').type('password123');
//     cy.get('[data-id="login-button"]').click();

//     // Assert redirection to the dashboard
//     cy.url().should('include', '/dashboard');
//   });
// });