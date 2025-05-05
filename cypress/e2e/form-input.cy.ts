describe('Form Input Test Suite', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/auth/login'); 
  });

  it('Allows user to fill out the form and submit', () => {
    // Fill out the form fields
    cy.get('input[name="email_or_phone"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');

    // Assert that the inputs contain the correct values
    cy.get('input[name="email_or_phone"]').should('have.value', 'testuser@example.com');
    cy.get('input[name="password"]').should('have.value', 'password123');

    // Submit the form
    cy.get('form').submit();

    // Assert the page does not break and stays on the login page
    cy.url().should('include', '/auth/login'); // Adjust if the URL changes after submission
  });

  it('Submits the form even with empty inputs', () => {
    // Submit the form without entering any data
    cy.get('form').submit();

    // Assert the page does not break and stays on the login page
    cy.url().should('include', '/auth/login'); // Adjust if the URL changes after submission
  });
});