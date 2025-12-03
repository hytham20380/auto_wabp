import Teams from '../Pages/Teams';
import BasePage from '../Pages/BasePage';


describe('Teams Page Functionality', () => {

  BasePage.init(Teams, 'TeamsData');


  it('1. Search for existing team', function () {
    BasePage.openSearch();
    Teams.enterName(this.TeamsData.team.name);
    Teams.clickSearch();
    Teams.assertTeamVisible(this.TeamsData.team.name);
  });

  it('2. Clear search fields', function () {
    BasePage.openSearch();
    Teams.enterName(this.TeamsData.team.name);
    Teams.selectWorkingType();
    BasePage.clickClear();

    cy.get(".mat-select-min-line").should('contain', 'All');
  });

  it('3. View team details', function () {
    Teams.clickView(this.TeamsData.team.name);

    // Replace with your actual element/contenttttt
    cy.url().should('include', '/teams/view');
  });

  it('4. Edit team info', function () {

    const newName = BasePage.generateDynamicName(this.TeamsData.editedTeam.name);


    BasePage.openSearch();
    Teams.selectWorkingType();
    Teams.clickSearch();
    Teams.clickEdit();
    Teams.enterName(newName);
    Teams.updateWorkingType();
    Teams.clickSave();
    
  });

  it('4. Should Export Teams', function () {
    BasePage.Export('Teams');

  });

});

