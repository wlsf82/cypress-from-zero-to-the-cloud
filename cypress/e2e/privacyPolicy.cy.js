Cypress._.times(5, () => {
  it('independently test the privacy policy page', () => {
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
  })
})
