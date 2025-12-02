import LoginPage from '../Pages/LoginPage';
import PreMessagePage from '../Pages/PreMessagePage';
import BasePage from '../Pages/BasePage';



describe('Pre Message Page Tests', () => {

  BasePage.init(PreMessagePage, 'PreMessageData');

  it('Should add a new Message ', function () {
    PreMessagePage.clickAdd();
    PreMessagePage.fillnewMessage(this.PreMessageData.newMessage.Message);
    PreMessagePage.clickSave();
    PreMessagePage.getSearchResults().should('contain', this.PreMessageData.newMessage.Message);
  });

  it('Should edit the first Message', function () {
    PreMessagePage.clickEditFirst();
    PreMessagePage.fillnewMessage(this.PreMessageData.editedMessage.Message);
    PreMessagePage.clickSave();
    PreMessagePage.getSearchResults().should('contain', this.PreMessageData.editedMessage.Message);
  });

  it('Should search by Message and display results', function () {
    BasePage.openSearch();
    PreMessagePage.enterSearchMessage(this.PreMessageData.editedMessage.Message);
    PreMessagePage.clickSearch();
    PreMessagePage.getSearchResults().should('contain.text', this.PreMessageData.editedMessage.Message);

  });

  it('Should clear the search field', function () {
    BasePage.openSearch();
    PreMessagePage.enterSearchMessage(this.PreMessageData.searchMessage);
    BasePage.clickClear();
    PreMessagePage.getSearchInput().should('have.value', '');
  });

  
  it('Should delete the first Message', () => {
    BasePage.Delete();
    cy.wait(500); // Optional: give time for delete to reflect
  });
  
});
