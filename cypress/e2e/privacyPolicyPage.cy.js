it('7.3. independently test the privacy policy page ', () => {
    cy.visit('./src/privacy.html')

    cy.title().should('be.equal', 'TAT Customer Service Center - Privacy Policy')
    cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
})