import BasePage from "./BasePage";

class PreMessagePage extends BasePage {
  visit() {

    //cy.visit ('/preMessages/index');
    cy.contains('span.nav-link-text' , 'Pre-Messages').click();

  }
  getSearchInput() {
    return cy.get('input[formcontrolname="message"]');
  }

  enterSearchMessage(editedMessage) {
    cy.get('[formcontrolname="message"]').clear().type(editedMessage);
  }

  clickSearch() {
    super.clickSearch();
  }

  clickClear() {
    super.clickClear();
  }

  // PreMessagePage.js
getSearchResults() {
  return cy.get('table.mat-table tr'); // get table rows
}


  clickAdd() {
  super.clickAddNew();


}


  fillnewMessage(message) {
    cy.get('[formcontrolname="message"]').clear().type(message);
  }

  clickSave() {
    super.clickSave();
  }

  clickEditFirst() {
    cy.get('table tbody tr').first().within(() => {
      super.clickEdit();
    });
  }

  clickDeleteFirst() {
    cy.get('table tbody tr').first().within(() => {
      super.clickDelete();
    });
  }

  confirmDelete() {
    super.confirmDialog();
  }



  openSearch() {
        super.openSearch();
  }
}

export default new PreMessagePage();