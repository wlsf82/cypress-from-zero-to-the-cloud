// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const firstName = 'Elizabeth'
    const lastName = 'The Queen'
    const email = 'queen@thegreat.com'
    const phone = '123456789'

    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type("Hello Cypress")

    cy.get('button[type=submit]').click()
})

Cypress.Commands.add('personInformationAndSubmit', (person) => {
    cy.get('#firstName').type(person.firstName)
    cy.get('#lastName').type(person.lastName)
    cy.get('#email').type(person.email)
    cy.get('#open-text-area').type("Hello Cypress")

    cy.get('button[type=submit]').click()
})

Cypress.Commands.add('personalInformationAndSubmit',(person = {firstName: "leonardo", lastName: "Da Vinci", email: "leo@davinci.com", comment: "the mona lisa is awesome" }) => {
    cy.get('#firstName').type(person.firstName)
    cy.get('#lastName').type(person.lastName)
    cy.get('#email').type(person.email)
    cy.get('#open-text-area').type(person.comment)

    cy.contains('button', 'Send').click()

})