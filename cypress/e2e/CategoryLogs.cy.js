import CategoryLogsPage from '../Pages/CategoryLogsPage';
import BasePage from '../Pages/BasePage';


describe('Category Logs Page Tests', () => {

  BasePage.init(CategoryLogsPage, 'categoryLogsData');

  it('1️⃣ Should add a new category log', function () {

    const dynamiCategoryLog = BasePage.generateDynamicName(this.categoryLogsData.newCategory.name);

    CategoryLogsPage.clickAdd();
    CategoryLogsPage.fillCategoryName(dynamiCategoryLog);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', this.categoryLogsData.newCategory.name);

  });

  it('2️⃣ Should search by name and display results', function () {
    CategoryLogsPage.openSearch();
    CategoryLogsPage.enterSearchName(this.categoryLogsData.searchName);
    CategoryLogsPage.clickSearch();
    CategoryLogsPage.getSearchResults().should('contain', this.categoryLogsData.searchName);
  });

  it('3️⃣ Should clear the search field', function () {
    CategoryLogsPage.openSearch();
    CategoryLogsPage.enterSearchName(this.categoryLogsData.searchName);
    CategoryLogsPage.clickClear();
    CategoryLogsPage.getSearchInput().should('have.value', '');
  });

  it('4️⃣ Should edit the first category log', function () {
    CategoryLogsPage.clickEditFirst();

    CategoryLogsPage.fillCategoryName(this.categoryLogsData.editedCategory.name);
    CategoryLogsPage.clickSave();
    CategoryLogsPage.getSearchResults().should('contain', this.categoryLogsData.editedCategory.name);
  });

  it('5️⃣ Should delete the first category log', () => {
    CategoryLogsPage.clickDeleteFirst();
    CategoryLogsPage.confirmDelete();
    cy.wait(500); // Optional: give time for delete to reflect
  });
});
