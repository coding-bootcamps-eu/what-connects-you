/// <reference types="cypress" />
// https://docs.cypress.io/api/table-of-contents

describe("What Connects You App", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should have header with App Name", () => {
    cy.get("h1").should("contain", "What connects you?");
  });

  it("Should have input field", () => {
    cy.get("#name-input").should("exist");
  });

  it("Should have 'Add' Button", () => {
    cy.get("#addAttendeeButton").should("exist");
  });

  it("Should have 'Create Session' Button", () => {
    cy.get("#createSessionsButton").should("exist");
  });

  it("Should say 'No attendees added' when none are", () => {
    cy.get(".added-attendees__list").then(($list) => {
      if ($list.get("li") === undefined) {
        cy.get(".added-attendees__header").should(
          "contain",
          "No attendees added"
        );
      }
      //TODO: maybe use 'else if'
    });
  });

  it("Should add Name to 'added attendees'", () => {
    cy.get("#name-input").type("Name One {enter}");
    cy.get(".added-attendees__list").get("li").should("have.length", 1);
  });

  it("Should create 3 Sessions", () => {
    cy.get("#name-input")
      .type("Name One {enter}")
      .type("Name Two {enter}")
      .type("Name Three {enter}")
      .type("Name Four {enter}");
    cy.get("#createSessionsButton").click();
    cy.get(".sessions__list").get("li").should("have.length", 3);
  });

  it("Should reset sessions and attendees", () => {
    cy.get("#name-input").type("Name One {enter}").type("Name Two {enter}");
    cy.get("#createSessionsButton").click();
    cy.get("#resetButton").click();
    cy.get(".sessions__list").get("li").should("have.length", 0);
    cy.get(".added-attendees__list").get("li").should("have.length", 0);
    cy.get(".added-attendees__header").should("contain", "No attendees added");
  });

  it("Should say 'No attendees added' after reset", () => {
    cy.get("#name-input").type("Name One {enter}").type("Name Two {enter}");
    cy.get("#createSessionsButton").click();
    cy.get("#resetButton").click();
    cy.get(".added-attendees__list").then(($list) => {
      if ($list.get("li") === undefined) {
        cy.get(".added-attendees__header").should(
          "contain",
          "No attendees added"
        );
      }
      //TODO: maybe use 'else if'
    });
  });
});
