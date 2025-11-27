class BasePage {

  elements = {
    searchBtn: () => cy.contains('span', 'Search'),
    clearBtn: () => cy.contains('span', 'Clear'),
    editBtn: () => cy.contains('span', 'Edit').first(),
    deleteBtn: () => cy.contains('span', 'Delete').first(),
    addNewBtn: () => cy.contains('span', 'Add'),
    createBtn: () => cy.contains('span', 'Create'),
    saveBtn : () => cy.contains('span' , 'Save'),
    exportBtn: () => cy.get('button[title="Export To Excel"]'),
  };

  clickSearch() {
    this.elements.searchBtn().click();
  }

  clickClear() {
    this.elements.clearBtn().click();
  }

  clickEdit() {
    this.elements.editBtn().click();
  }

  clickDelete() {
    this.elements.deleteBtn().click();
  }

  clickAddNew() {
    this.elements.addNewBtn({ timeout: 10000 }).click();
  }

  clickCreate() {
    this.elements.createBtn().click();
  }

  clickSave() {
    cy.get('button', { timeout: 5000 }).contains('Save').should('be.visible').click({ force: true });
  }

  clickExport() {
    this.elements.exportBtn().click();
  }

  openSearch() {
    cy.get('div.search-form-expand-wrapper').then($wrapper => {
      const isVisible = $wrapper.css('opacity') === '1';
      if (!isVisible) {
        cy.get('.card-head-btns-wrapper > .btn-black').click();
        cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
          .should('have.css', 'opacity', '1');
      }
    });
  }

  confirmDialog() {
    cy.get('#mat-dialog-0').should('be.visible');
    cy.get('.mat-dialog-actions > .btn-black').click();
  }
}

export default BasePage;
