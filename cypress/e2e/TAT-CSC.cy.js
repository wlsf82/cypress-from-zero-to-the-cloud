describe('TAT Customer Service Center', () => {
  it('check application title', () => {
    cy.visit('./src/index.html')

    cy.title().should('be.equal', 'TAT Customer Service Center')
  })
})
