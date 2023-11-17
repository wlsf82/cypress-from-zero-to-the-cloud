describe("TAT Customer Service Center", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("checks the application title", () => {
    cy.title().should("eq", "TAT Customer Service Center");
  });

  it("fills in the required fields and submits the form", () => {
    const longText = Cypress._.repeat("abcdefghkiopqj", 10);
    cy.get("#firstName").type("Diego");
    cy.get("#lastName").type("Lacerda");
    cy.get("#email").type("dilacerda@gmail.com");
    cy.get("#open-text-area").type(longText, {
      delay: 0,
    });
    cy.contains(".button", "Send").click();
    cy.get(".success").should("be.visible");
  });

  it("displays an error message when submitting the form with an email with invalid formatting", () => {
    cy.get("#firstName").type("Diego");
    cy.get("#lastName").type("Lacerda");
    cy.get("#email").type("dilacerdagmailcom");
    cy.get("#open-text-area").type("peace, peace, peace, vai malandro, chuta", {
      delay: 0,
    });
    cy.contains(".button", "Send").click();
    cy.get(".error").should("be.visible");
  });

  it("displays an error message when the phone becomes required but is not filled in before the form submission", () => {
    cy.get("#firstName").type("Diego");
    cy.get("#lastName").type("Lacerda");
    cy.get("#email").type("dilacerda@gmail.com");
    cy.get("#phone").should("have.value", "");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("peace, peace, peace", { delay: 0 });
    cy.contains(".button", "Send").click();
    cy.get(".error").should("be.visible");
  });

  it("fills and clears the first name, last name, email, and phone fields", () => {
    cy.get("#firstName")
      .type("Diego")
      .should("have.value", "Diego")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Lacerda")
      .should("have.value", "Lacerda")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("dilacerda@gmail.com")
      .should("have.value", "dilacerda@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone").should("have.value", "");
    cy.get("#open-text-area")
      .type("peace, peace, peace", { delay: 0 })
      .clear()
      .should("have.value", "");
    cy.contains(".button", "Send").click();
    cy.get(".error").should("be.visible");
  });

  it("successfully submits the form using a custom command", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("selects a product (YouTube) by its content", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("selects a product (Mentorship) by its value", () => {
    cy.get("#product").select("mentorship").should("have.value", "mentorship");
  });

  it("selects a product (Blog) by its index", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("checks the type of service 'Feedback'", () => {
    cy.get('[type="radio"]')
      .check("feedback")
      .should("have.checked", "feedback");
  });

  it("checks each type of service", () => {
    cy.get("#support-type")
      .find('[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService).check().should("be.checked");
      });
  });

  it("checks both checkboxes, then unchecks the last one", () => {
    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("selects a file from the fixtures folder", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/profilepic.png")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("profilepic.png");
      });
  });

  it("selects a file simulating a drag-and-drop'", () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/profilepic.png", {
        subjectType: "drag-n-drop",
      })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("profilepic.png");
      });
  });

  it("selects a file using a fixture to which an alias was given'", () => {
    cy.fixture("profilepic.png").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("profilepic.png");
      });
  });

  it("verifies that the privacy policy page opens in another tab without the need for a click", () => {
    cy.contains("a", "Privacy Policy")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("access the privacy policy page by removing the target, then clicking on the link", () => {
    cy.contains("a", "Privacy Policy").invoke("removeAttr", "target").click();
    cy.contains("h1", "TAT CSC - Privacy Policy").should("be.visible");
  });

 
});
