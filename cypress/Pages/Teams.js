import BasePage from "./BasePage";

class TeamsPage extends BasePage {
  visit() {
    cy.contains('span', 'Teams').click();;
  }

  enterName(name) {
    cy.get('[formcontrolname="name"]').clear().type(name);
  }

  selectWorkingType() {
    // Assuming a mat-select is used, update this based on your actual UI
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains("24/7").click();
  }

  updateWorkingType() {

    cy.get('.c-btn').click({ force: true });                // opens the dropdown
    cy.get('.lazyContainer > :nth-child(2)').click();
    


  }

  clickSearch() {
    super.clickSearch();
  }

  clickClear() {
    super.clickClear();
  }

  getSearchResults() {
    return cy.get('table'); // Capital "Clear"
  }

  clickView() {
    cy.get('.btn-primary-outline').first().click();
  }

  clickEdit() {
     super.clickEdit();
  }

  clickDelete() {
    super.clickDelete();
  }

  clickSave() {
    super.clickSave();
  }

  assertTeamVisible(teamName) {
    cy.contains(teamName).should('exist');
  }

  assertNoResults() {
    cy.contains('No teams found').should('exist');
  }


  openSearch() {
    super.openSearch();

  }



}

export default new TeamsPage();
