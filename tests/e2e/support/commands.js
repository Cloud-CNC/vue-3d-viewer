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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('upload', (name, data, mime, selector) =>
{
  cy.get(selector).closest('.v-file-input').then(element =>
    {
      //Get window to instantiate correct File (https://github.com/cypress-io/cypress/issues/933)
      cy.window().then(window =>
      {  
        //Create the file
        const file = new window.File([data], name, {
          type: mime
        });
  
        //Mock file upload
        element[0].__vue__.internalValue = file;
      });
    });
});