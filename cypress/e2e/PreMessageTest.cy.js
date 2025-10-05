import LoginPage from '../Pages/LoginPage';
import PreMessagePage from '../Pages/PreMessagePage';


describe('Pre Message Page Tests', () => {
  beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');
    cy.fixture('PreMessageData').as('data');

    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('include', '/pages/dashboard');
    });

    // Now visit the category log page after login
    PreMessagePage.visit();
  });


  it('Should add a new Message ', function () {
    PreMessagePage.clickAdd();
    PreMessagePage.fillnewMessage(this.data.newMessage.Message);
    PreMessagePage.clickSave();
    PreMessagePage.getSearchResults().should('contain', this.data.newMessage.Message);
  });

  it('Should edit the first Message', function () {
    PreMessagePage.clickEditFirst();
    PreMessagePage.fillnewMessage(this.data.editedMessage.Message);
    PreMessagePage.clickSave();
    PreMessagePage.getSearchResults().should('contain', this.data.editedMessage.Message);
  });

  it('Should search by Message and display results', function () {
    PreMessagePage.openSearch();
    PreMessagePage.enterSearchMessage(this.data.editedMessage.Message);
    PreMessagePage.clickSearch();
    PreMessagePage.getSearchResults().should('contain.text', this.data.editedMessage.Message);

  });

  it('Should clear the search field', function () {
    PreMessagePage.openSearch();
    PreMessagePage.enterSearchMessage(this.data.searchMessage);
    PreMessagePage.clickClear();
    PreMessagePage.getSearchInput().should('have.value', '');
  });

  
  it('Should delete the first Message', () => {
    PreMessagePage.clickDeleteFirst();
    PreMessagePage.confirmDelete();
    cy.wait(500); // Optional: give time for delete to reflect
  });
  
});
