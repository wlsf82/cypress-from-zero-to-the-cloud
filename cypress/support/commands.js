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

//Fills Mandatory Fields and Submits
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data) => {
    // below the default arguments of the custom command than can be used if no arguments are passed from the test.
    //Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    //     firstName: 'Mark',
    //     lastName: 'Baker',
    //     email: 'Mark@test.ca',
    //     text: 'Extra exercise 7'
    // }) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('.button[type="submit').click()
})