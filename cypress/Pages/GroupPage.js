class GroupPage {

  // -------- Navigation --------
  visit() {
    cy.get('span.nav-link-text').contains('Groups').click();
  }

  // -------- Buttons --------
  clickAdd() {
    cy.contains('button', 'Add Group').click();
  }


  clickAddcontacts() {
    cy.get('button:contains("Add")').click();


  }

  clickSave() {
    cy.contains('button', 'Save', { matchCase: false }).click();
  }

  clickEdit() {
    cy.contains('button', 'Edit').click();


  }

  ClickSaveFormanuallycontacts() {
    cy.get('.mat-dialog-actions > .btn').click();
  }

  ClickOnSearchButtonOnGroupPage() {
    cy.get('.btn-search-actions-wrapper > .btn-black').click();
  }



  openSearch() {
    cy.get('div.search-form-expand-wrapper').then($wrapper => {
      const isVisible = $wrapper.css('opacity') === '1';
      if (!isVisible) {
        cy.get('.card-head-btns-wrapper > .btn-black').click();
        // Wait for the panel to become visible after clicking
        cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
          .should('have.css', 'opacity', '1');
      }
    });
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
    cy.get('.btn-search-actions-wrapper > .btn-black').click();

  }

  getSearchResults() {
    return cy.get('table'); // You can refine this if you have rows or columns
  }

  clickClearingroupcontactslist() {
    cy.get('.btn-transparent').click();
  }


  getSearchResults() {
    return cy.get('table');
  }

  deleteContactsfromList() {
    cy.contains('button span', 'Delete').click();
  }

  ConfirmdeleteContactsfromList() {
    cy.get('button.btn.btn-black').contains('Delete').click();
  }

  Clickonfilebutton() {
    cy.contains('button', 'File').click();
  }

  Clickonaddfilebutton() {
    cy.get('.card-head-btns-wrapper > .btn').click();
  }

  Clickonsavebuttonforuploadfile() {
    cy.get('.mat-dialog-actions > .btn-black').click();
  }

  ExportGroup() {
    cy.get('button[title="Export To Excel"]').click()

  }

  ClickSearchButtonInFilePege() {
    cy.get('.btn-search-actions-wrapper > .btn-black').click();
  }

  ClickClearButtonInFilePege() {
    cy.get('.btn-transparent').click();

  }

  enterfilename(fileName) {
    cy.get('input[formcontrolname="fileName"]').clear().type(fileName);
  }

  ClickOnExportContactsButton() {
    cy.get('button[title="Export To Excel"]').click();

  }

  ClickOnDeleteGroupButton() {
    cy.contains('button', 'Delete').click();


  }
  ClickOnConfirmDeleteGroupButton() {
    cy.get('.mat-dialog-actions > .btn-black').click();
  }

  openSearch() {
    cy.get('div.search-form-expand-wrapper').then($wrapper => {
      const isVisible = $wrapper.css('opacity') === '1';
      if (!isVisible) {
        cy.get('.card-head-btns-wrapper > .btn-black').click();
        // Wait for the panel to become visible after clicking
        cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
          .should('have.css', 'opacity', '1');
      }
    });

  }

  EnterGroupName(updateName) {
    cy.get('input[formcontrolname="groupName"]').clear().type(updateName);
  }

  ClickOnSearchButtonOnGroupPage() {
    cy.get('.btn-search-actions-wrapper > .btn-black').click();
  }

  getSearchInput() {
    return cy.get('input[formcontrolname="updateName"]');
  }

}
export default new GroupPage();
