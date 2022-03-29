/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const USERNAME = Cypress.env("username");

describe('Qualitor Password Reset', () => {
  beforeEach(() => {
    const qualitorUrl = Cypress.env("qualitorUrl");
    const password = Cypress.env("password");
    const domain = Cypress.env("domain");

    cy.ntlm([qualitorUrl], USERNAME, password, domain);
    cy.visit(`https://${qualitorUrl}/`);
  })

  it('Solicitar reset de senha', () => {
    const { helpDeskUrl, divContato, userId, divDescricao, btnEnviar } = getEnvironmentVariables();
    let greetings = getGreetings();
    let message = `${greetings}, tudo bem?\n\nPoderiam por favor resetar a minha do qualitor e me enviar no Teams?\n\nUsuário : ${USERNAME}\n\nGrato desde já.`;

    cy.visit(helpDeskUrl);
    cy.get(divContato).type(userId);
    cy.get(divDescricao).type(message);
    cy.get(btnEnviar).click();

    function getEnvironmentVariables() {
      const helpDeskUrl = Cypress.env("helpDeskUrl");
      const userId = Cypress.env("userId");
      const divContato = Cypress.env("divContato");
      const divDescricao = Cypress.env("divDescricao");
      const btnEnviar = Cypress.env("btnEnviar");
      return { helpDeskUrl, divContato, userId, divDescricao, btnEnviar };
    }

    function getGreetings() {
      const hours = new Date().getHours();
      let greetings = "Bom dia";

      if (hours >= 12) {
        greetings = "Boa ";
        greetings += hours >= 18 ? "noite" : "tarde";
      }
      return greetings;
    }

    // cy.get('//*[@id="divAlert"]/div/table/tbody/tr[1]/td/table/tbody/tr[1]/td[2]/div/text()[2]').should().contains(" gerado com sucesso.");
  })
})
