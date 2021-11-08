describe('Orders', () => {
  it('Should login and navigate to orders page', () => {
    cy.login('admin','test');
    cy.contains('Welcome');
    cy.get('ul li').eq(0).click();
    cy.url().should('include','orders');
  })

})
