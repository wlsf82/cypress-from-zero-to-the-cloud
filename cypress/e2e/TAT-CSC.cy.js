describe('TAT Customer Service Center', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('check application title', () => {
    cy.title().should('be.equal', 'TAT Customer Service Center')
  })

  it('fills in the required fields and submits the form', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Thanks!')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
})
