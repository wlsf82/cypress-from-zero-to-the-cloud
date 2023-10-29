it("independently test the privacy policy page", () => {
  cy.visit("./src/privacy.html");
  cy.url().should("include", "privacy.html");
});
