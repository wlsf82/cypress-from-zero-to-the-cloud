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
    cy.get('#phone-checkbox').check()
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

  it('selects a product (Mentorship) by its value', () => {
    cy.get('#product')
      .select('mentorship')
      .should('have.value', 'mentorship')
  })

  it('selects a product (Blog) by its index', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('checks the type of service "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('checks each type of service', () => {
    cy.get('#support-type')
      .find('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('checks both checkboxes, then unchecks the last one', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('selects a file from the fixtures folder', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selects a file simulating a drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selects a file using a fixture to which an alias was given', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifies that the privacy policy page opens in another tab without the need for a click', () => {
    cy.contains('a', 'Privacy Policy')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('access the privacy policy page by removing the target, then clicking on the link', () => {
    cy.contains('a', 'Privacy Policy')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible')
  })
})
