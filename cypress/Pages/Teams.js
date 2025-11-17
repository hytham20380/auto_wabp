class TeamsPage {
  visit() {
    cy.get(':nth-child(6) > .subnav-link').click();
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

    cy.get('span').contains('Custom').click({ force: true });                // opens the dropdown

    cy.get(':nth-child(1) > label').click();


  }

  clickSearch() {
    cy.contains('button', 'Search').click();
  }

  clickClear() {
    cy.contains('button', 'Clear').click(); // Capital "Clear"
  }

  clickView() {
    cy.get('.btn-primary-outline').first().click();
  }

  clickEdit() {
    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > .ng-tns-c253-2').first().click();
  }

  clickSave() {
    cy.get('span').contains('Save').click();
  }

  assertTeamVisible(teamName) {
    cy.contains(teamName).should('exist');
  }

  assertNoResults() {
    cy.contains('No teams found').should('exist');
  }


  openSearch() {
    cy.get('div.search-form-expand-wrapper').then($wrapper => {
      const isVisible = $wrapper.css('opacity') === '1';
      if (!isVisible) {
        cy.get('.card-head-btns-wrapper .btn-black').click();
        cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
          .should('have.css', 'opacity', '1');
      }
    });
  }

  Exportteams() {
        cy.get('.btn-black-outline').click();

}

}

export default new TeamsPage();
