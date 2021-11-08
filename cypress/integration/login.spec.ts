describe('Login', () => {
  
  it('Should not login if the form is invalid', () => {
    cy.visit('/');
    cy.url().should('include','login');
    cy.get('[formControlName="username"]').type('admin');

    cy.get('button').should('be.disabled');

  })

  it('Should login if the form is valid', () => {
    cy.login('test','test');
    cy.contains('Welcome, User')
  })

})
