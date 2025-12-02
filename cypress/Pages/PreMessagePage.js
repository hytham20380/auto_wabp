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
    super.clickSearch();              //super is used to Call the parent constructor, Call a method from the parent class.
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

 
}

export default new PreMessagePage();