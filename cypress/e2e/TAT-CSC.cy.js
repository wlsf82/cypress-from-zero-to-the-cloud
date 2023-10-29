
describe('TAT Customer Service Center', () => {
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })
  it('checks the application title', () => {
    cy.title().should('be.equal', 'TAT Customer Service Center')
  })
  it('fills in the required fields and submits the form', () => {
    const longText = Cypress._.repeat("This is a test. Hello Cypress.", 10)
    cy.get('#firstName').type('Hello')
    cy.get('#lastName').type('World')
    cy.get('#email').type('hello@world.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Send').click()

    cy.get('.success').should('be.visible')
  })
  it('displays an error message when submitting the form with an email with invalid formatting', () => {
    cy.get('#email').type('####')
    cy.contains('button', 'Send').click()

      cy.get('.error').should('be.visible')
  })
  it('validates phone number input remains empty if a non-numeric value is entered.', () => {
    cy.get('#phone').type('abc')

    cy.get('#phone').should('have.value', "")
  })
  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
    cy.get('#firstName').type('Hello')
    cy.get('#lastName').type('World')
    cy.get('#email').type('hello@world.com')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Send').click()


    cy.get('.error').should('be.visible')
  })
  it('fills and clears the first name, last name, email, and phone fields', () => {

    const firstName = 'Albert'
    const lastName = 'The Great'
    const email = 'albert@thegreat.com'
    const phone = '123456789'

    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)

    cy.get('#firstName').should('have.value', firstName)
    cy.get('#lastName').should('have.value', lastName)
    cy.get('#email').should('have.value', email)
    cy.get('#phone').should('have.value', phone)

    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#email').clear()
    cy.get('#phone').clear()

    cy.get('#firstName').should('have.value', "")
    cy.get('#lastName').should('have.value', "")
    cy.get('#email').should('have.value', "")
    cy.get('#phone').should('have.value', "")
  })
  it('displays an error message when submitting the form without filling the required fields', () => {
    cy.contains('button', 'Send').click()

    cy.get('.error').should('be.visible')
  })
  it('successfully submits the form using a custom command', () => {
    //cy.fillMandatoryFieldsAndSubmit()
    //cy.personInformationAndSubmit({firstName: "Juana", lastName: "De Arcos", email: "juana@dearcos.com"})

    cy.personalInformationAndSubmit()

    cy.get('.success').should('be.visible')
  })
  it('selects a product (YouTube) by its content', () => {
    cy.get('select').select('YouTube').should('have.value', 'youtube')
  })
  it('selects a product (Mentorship) by its value', () => {
    cy.get('#product').select('mentorship').should('have.value', 'mentorship')
  })
  it('selects a product (Blog) by its index', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })
  it('checks the type of service "Feedback"', () => {
    cy.get('[name="tat-service"]').check('feedback').should('be.checked')
  })
  it.only('checks each type of service', () => {
    cy.get('[name="tat-service"]').each(service => {
      cy.wrap(service).check().should('be.checked')
    })
  })

})