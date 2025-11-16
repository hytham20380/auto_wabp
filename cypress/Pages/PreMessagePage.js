class PreMessagePage {
  visit() {

    //cy.visit ('/preMessages/index');
    cy.get('#cdk-accordion-child-1 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(3) > .subnav-link > .nav-link-text').click();

  }
  getSearchInput() {
    return cy.get('input[formcontrolname="message"]');
  }

  enterSearchMessage(editedMessage) {
    cy.get('[formcontrolname="message"]').clear().type(editedMessage);
  }

  clickSearch() {
    cy.contains('button', 'Search', { matchCase: false }).click();
  }

  clickClear() {
    cy.contains('button', 'Clear', { matchCase: false }).click();
  }

  // PreMessagePage.js
getSearchResults() {
  return cy.get('table.mat-table tr'); // get table rows
}


  clickAdd() {
  cy.get('span[translate]').contains('Add New Message').click();

}


  fillnewMessage(message) {
    cy.get('[formcontrolname="message"]').clear().type(message);
  }

  clickSave() {
    cy.contains('button', 'Save', { matchCase: false }).click();
  }

  clickEditFirst() {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Edit').click();
    });
  }

  clickDeleteFirst() {
    cy.get('table tbody tr').first().within(() => {
      cy.contains('button', 'Delete').click();
    });
  }

  confirmDelete() {
    cy.get('.mat-dialog-actions > .btn-black').click()
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
}

export default new PreMessagePage();