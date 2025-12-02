import BasePage from "./BasePage";

class GroupPage extends BasePage {

  // -------- Navigation --------
  visit() {
    cy.get('span.nav-link-text').contains('Groups').click();
  }

  // -------- Buttons --------
  clickAdd() {
    super.clickAddNew();           //super is used to Call the parent constructor, Call a method from the parent class.
                                       
  }

  clickAddcontacts() {
    super.clickAddNew();

  }

  clickSave() {
    super.clickSave();

  }

  clickEdit() {
    super.clickEdit();


  }

  ClickSaveFormanuallycontacts() {
    cy.get('.mat-dialog-actions > .btn').click();
  }

  ClickOnSearchButtonOnGroupPage() {
    super.clickSearch();
  }

  addGroupName(groupName) {
    cy.get('[formcontrolname="groupName"]').type(groupName);

  }

  updateGroupName(updateName) {
    cy.get('[formcontrolname="groupName"]').clear().type(updateName);

  }
  updateAvailabilty() {

    cy.contains('label', 'No').click();

  }

  selectGrouptypeInsearch(groupType) {
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains(groupType).click();
  }


  selectGroupAvailability(updateAvailability) {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains(updateAvailability).click();
  }

  selectGroupType(groupType) {
    cy.get('.mat-select-placeholder').click();

    cy.get('mat-option').contains(groupType).click();
  }





  searchGroupByName(groupName) {
    cy.get('[formcontrolname="groupName"]').clear().type(groupName);
  }

  AddContactsmanually() {
    cy.get('.btn-primary').click();
  }

  enterMobilenumber(mobileNumber) {
    cy.get('#phone').clear().type(mobileNumber);
  }

  searchWithmobileNumber(mobileNumber) {
    cy.get('[formcontrolname="mobileNumber"]').clear().type(mobileNumber);

  }

  clickSearchincontactslist() {
    super.clickSearch();

  }

  getSearchResults() {
    return cy.get('table'); // You can refine super if you have rows or columns
  }

  getSearchResults() {
    return cy.get('table');
  }

  

  Clickonfilebutton() {
    cy.contains('button', 'File').click();
  }

  Clickonaddfilebutton() {
    super.clickAddNew();
  }

  Clickonsavebuttonforuploadfile() {
    super.clickSave();
  }



  ClickSearchButtonInFilePege() {
    super.clickSearch();

  }

  
  enterfilename(fileName) {
    cy.get('input[formcontrolname="fileName"]').clear().type(fileName);
  }

  

  EnterGroupName(updateName) {
    cy.get('input[formcontrolname="groupName"]').clear().type(updateName);
  }

  ClickOnSearchButtonOnGroupPage() {
    super.clickSearch();
  }

  getSearchInput() {
    return cy.get('input[formcontrolname="updateName"]');
  }
}
export default new GroupPage();
