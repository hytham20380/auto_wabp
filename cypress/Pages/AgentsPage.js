import BasePage from "./BasePage";

class AgentsPage extends BasePage {

  // ----------------- Navigation -----------------
  visit() {
    cy.contains('span.nav-link-text', 'Agents').click();
  }

  // ----------------- Add New Agent -----------------
  AddNewAgent(FullName, email, integrationId = '') {

    // Use BasePage Encapsulated Action
    this.clickAddNew();

    // Fill Full Name and Email
    cy.get('input[data-placeholder="Full Name"]').type(FullName);
    cy.get('input[formcontrolname="email"]').type(email);

    // Select Role (first role)
    cy.contains('Select Role').click();
    cy.get('#roleDD label').first().click();

    // Optional Integration ID
    cy.get('body').then($body => {
      if ($body.find('input[formcontrolname="integrationId"]').length > 0) {
        cy.get('input[formcontrolname="integrationId"]', { timeout: 10000 })
          .should('be.visible')
          .then($input => {
            if (!$input.val()) {
              cy.wrap($input).type(integrationId, { force: true });
            }
          });
      }
    });

    // Select Team
    cy.contains('Select Team').click();
    cy.get('#teamDD label').first().click();

    // Save Agent (Encapsulated)
    this.clickSave();
  }


  // ----------------- Search -----------------
  SearchByName(Name) {
    this.openSearch();
    cy.get('input[data-placeholder="Name"]').type(Name);
    this.clickSearch();
  }

  SearchByEmail(Email) {
    this.openSearch();
    cy.get('input[data-placeholder="Email"]').type(Email);
    this.clickSearch();
  }

  clearButton() {
    this.clickClear();
  }


  // ----------------- Edit -----------------
  EditAgent(Name, Email) {

    // Encapsulated method from BasePage
    this.clickEdit();

    cy.get('input[data-placeholder="Full Name"]').clear().type(Name);
    cy.get('input[formcontrolname="email"]').clear().type(Email);

    this.clickSave();
  }


  // ----------------- Activate / Inactive -----------------
  changetoNotactive() {
    cy.contains('Active').click();
    this.confirmDialog();
  }

  changetoActive() {
    cy.contains('Not Active').click();
    this.confirmDialog();
  }


  // ----------------- Delete -----------------
  DeleteAgent() {
    this.clickDelete();
    this.confirmDialog();
  }


  // ----------------- Export -----------------
  ExportAgents() {
    this.clickExport();
  }

}

export default new AgentsPage();
