describe('TAT Customer Service Center', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('check application title', () => {
    cy.title().should('be.equal', 'TAT Customer Service Center')
  })

  it('fills in the required fields and submits the form', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Send').click()

    cy.get('.success').should('be.visible')
  })

  it('displays an error message when submitting the form with an email with invalid formatting', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting,com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Send').click()

    cy.get('.error').should('be.visible')
  })

  it('validates that the phone input field only accepts numbers', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Lima e Silva Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    cy.get('#open-text-area').type('Test')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Send').click()

    cy.get('.error').should('be.visible')
  })

  it('fills and clears the first name, last name, email, and phone fields', () => {
    cy.get('#firstName')
      .type('Walmyr')
      .should('have.value', 'Walmyr')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Lima e Silva Filho')
      .should('have.value', 'Lima e Silva Filho')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('walmyr@talkingabouttesting.com')
      .should('have.value', 'walmyr@talkingabouttesting.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('12345678989')
      .should('have.value', '12345678989')
      .clear()
      .should('have.value', '')
  })

  it('displays an error message when submitting the form without filling the required fields', () => {
    cy.contains('button', 'Send').click()

    cy.get('.error').should('be.visible')
  })

  it('successfully submits the form using a custom command', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('selects a product (YouTube) by its content', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
})
