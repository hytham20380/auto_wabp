import BasePage from "./BasePage";

class CategoryLogsPage extends BasePage {
  visit() {
    cy.get('span.nav-link-text').contains('Log Category Type').click();
  }            

  getSearchInput() {
    return cy.get('input[formcontrolname="categoryLogName"]');
  }

  enterSearchName(name) {
     cy.get('input[placeholder="Name"]').type(name);
  }

  clickSearch() {
    super.clickSearch();        //super is used to Call the parent constructor, Call a method from the parent class.
  }

  getSearchResults() {
    return cy.get('table'); // You can refine this if you have rows or columns
  }

  clickAdd() {
    super.clickAddNew();
  }

  fillCategoryName(name) {
    cy.get('input[data-placeholder="Category Log Name"]').clear().type(name)
  }
  getCategoryName() {
    return cy.get('input[data-placeholder="Category Log Name"]')
  }

  clickSave() {
    super.clickSave();
  }

  clickEditFirst() {
    cy.get('table tbody tr').first().within(() => {
      super.clickEdit() // Adjust if icon button
    });
  }


}

export default new CategoryLogsPage();
