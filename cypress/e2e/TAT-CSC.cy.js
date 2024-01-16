describe('TAT Customer Service Center', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('2.1. Checks the application title', () => {
    cy.title().should('be.equal', 'TAT Customer Service Center')
  })

  it('2.2. Fills in the required fields and submits the form', () => {
    const longText = Cypress._.repeat('QWERTYUIOPASDFghjklzxcvbnm', 10)
    cy.get('#firstName').type('Anna')
    cy.get('#lastName').type('Blanco')
    cy.get('#email').type('anna@test.ca')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button[type="submit').click()

    cy.get('.success').should('be.visible')
  })

  it('2.3. Displays an error message when submitting the form with an email with invalid formatting', () => {
    cy.get('#firstName').type('Anna')
    cy.get('#lastName').type('Blanco')
    cy.get('#email').type('anna_test_ca')
    cy.get('#open-text-area').type('Extra exercise 2')
    cy.get('.button[type="submit').click()

    cy.get('.error').should('be.visible')
  })

  it('2.4.  The phone field should not accept non-nummeric values', () => {
    cy.get('#firstName').type('Anna')
    cy.get('#lastName').type('Blanco')
    cy.get('#email').type('anna@test.ca')
    cy.get('#open-text-area').type('Extra exercise 3')
    cy.get('#phone')
      .type('aBcD')
      .should('have.value', '')
    cy.get('#phone')
      .type('!@#')
      .should('have.value', '')
    cy.get('#phone')
      .type('1@3$5', 0)
      .should('have.value', '135')
  })

  it('2.5. Displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName').type('Anna')
    cy.get('#lastName').type('Blanco')
    cy.get('#email').type('anna@test.ca')
    cy.get('#open-text-area').type('Extra exercise 4')
    cy.get('#phone-checkbox').click()

    //cy.get(':nth-child(2) > :nth-child(2) > label').should('have.value', 'Phone (required)')
    cy.get('.button[type="submit').click()

    cy.get('.error').should('be.visible')
  })

  it('2.6. Fills and clears the first name, last name, email, and phone fields', () => {
    cy.get('#firstName')
      .type('Anna')
      .should('have.value', 'Anna')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Blanco')
      .should('have.value', 'Blanco')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('anna@test.ca')
      .should('have.value', 'anna@test.ca')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area').type('Extra exercise 5')
  })

  it('2.7. Displays an error message when submitting the form without filling the required fields', () => {
    cy.get('#open-text-area').type('Extra exercise 6')
    cy.get('.button[type="submit').click()

    cy.get('.error').should('be.visible')
  })

  it('2.8. Successfully submits the form using a custom command', () => {
    const data = {
      firstName: 'Anna',
      lastName: 'Blanco',
      email: 'Anna@test.ca',
      text: 'Test'
    }
    cy.fillMandatoryFieldsAndSubmit(data)
    //cy.fillMandatoryFieldsAndSubmit() //if not passing the 'data' argument here it would use the default arguments in the custom command(commented out for now)

    cy.get('.success').should('be.visible')
  })

  it('2.9. Identify the Submit button', () => {
    cy.get('#firstName').type('Maria')
    cy.get('#lastName').type('Mirabella')
    cy.get('#email').type('maria@test.ca')
    cy.get('#open-text-area').type('Extra exercise 8')
    cy.contains('button', 'Send').click()

    cy.get('.success').should('be.visible')
  })

  it('3.1. Selects a product (YouTube) by its content', () => {
    cy.get('#product').select('Blog')
      .should('have.value', 'blog')
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('3.2. Selects a product (Mentorship) by its value', () => {
    cy.get('#product').select('mentorship')
      .should('have.value', 'mentorship')
  })

  it('3.3. sSelects a product (Blog) by its index', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it('4.1. checks the type of service "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('4.2. checks each type of service', () => {
    ////commented out solution#1
    // cy.get('input[type="radio"][value="help"]')
    //   .check()
    //   .should('be.checked')

    // cy.get('input[type="radio"][value="praise"]')
    //   .check()
    //   .should('be.checked')

    // cy.get('input[type="radio"][value="feedback"]')
    //   .check()
    //   .should('be.checked')

    //Solution #2
    cy.get('#support-type')
      .find('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })

  })

  it('5.1. checks both checkboxes, then unchecks the last one', () => {
    cy.get('input[type="checkbox"]')
      .check()
    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
    cy.get('input[type="checkbox"]')
      .first()
      .should('be.checked')
    cy.get('input[type="checkbox"]')
      .last()
      .should('not.be.checked')
  })

  it('5.2. displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName').type('Anna')
    cy.get('#lastName').type('Blanco')
    cy.get('#email').type('anna@test.ca')
    cy.get('#phone-checkbox')
      .check()
      .should('be.checked')
    cy.get('.button[type="submit').click()
    cy.get('.error').should('be.visible')
  })

  it('6.1. selects a file from the fixtures folder', () => {
    cy.get('#file-upload').selectFile('./cypress/fixtures/example.json')
      .should(input => {
        //console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('6.2. selects a file simulating a drag-and-drop', () => {
    cy.get('#file-upload').selectFile('./cypress/fixtures/Test_file_to_drag.txt', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('Test_file_to_drag.txt')
      })
  })

  it('6.3. selects a file using a fixture to which an alias was given', () => {
    cy.fixture('example.json').as('test6_3')
    cy.get('input[type=file]')
      .selectFile('@test6_3')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('7.1. verifies that the privacy policy page opens in another tab without the need for a click', () => {
    cy.contains('a', 'Privacy Policy')
      .should('have.attr', 'href', 'privacy.html')
      .should('have.attr', 'target', '_blank')
  })

  it('7.2. access the privacy policy page by removing the target, then clicking on the link', () => {
    cy.contains('a', 'Privacy Policy')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible')
  })

  //continue: video 39 or lesson 9

})