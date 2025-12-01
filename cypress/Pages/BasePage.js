import LoginPage from "../Pages/LoginPage";

class BasePage {

  elements = {
    searchBtn: () => cy.contains('span', 'Search'),
    clearBtn: () => cy.contains('span', 'Clear'),
    editBtn: () => cy.contains('span', 'Edit').first(),
    deleteBtn: () => cy.contains('span', 'Delete').first(),
    addNewBtn: () => cy.contains('span', 'Add'),
    createBtn: () => cy.contains('span', 'Create'),
    saveBtn: () => cy.contains('span', 'Save'),
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
    this.elements.saveBtn().click();
  }

  clickExport() {
    this.elements.exportBtn().click();
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

    cy.get('.mat-dialog-container', { timeout: 8000 }).should('be.visible');
    cy.get('.mat-dialog-actions > .btn-black').click();
  }

  static init(PageName, fixtureName) {

    beforeEach(function () {

      // Load login data & perform login
      cy.fixture('LoginData').then((loginData) => {

        LoginPage.visit();
        LoginPage.login(loginData.admin.email, loginData.admin.password);

        // Confirm login succeeded
        cy.url().should('not.include', '/auth/login');
      })

        // After login → Navigate to the target page
        .then(() => {
          return PageName.visit();
        })

        // Then load test data fixture
        .then(() => {
          return cy.fixture(fixtureName).then((data) => {
            this[fixtureName] = data;   // Attach data to test context
          });
        });

    });
  }

}

export default BasePage;
