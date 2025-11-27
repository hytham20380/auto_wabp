import Teams from '../Pages/Teams';
import BasePage from '../Pages/BasePage';


describe('Teams Page Functionality', () => {

  BasePage.init(Teams, 'TeamsData');


  it('1. Search for existing team', function () {
    Teams.openSearch();
    Teams.enterName(this.TeamsData.team.name);
    Teams.clickSearch();
    Teams.assertTeamVisible(this.TeamsData.team.name);
  });

  it('2. Clear search fields', function () {
    Teams.openSearch();
    Teams.enterName(this.TeamsData.team.name);
    Teams.selectWorkingType();
    Teams.clickClear();

    cy.get(".mat-select-min-line").should('contain', 'All');
  });

  it('3. View team details', function () {
    Teams.clickView(this.TeamsData.team.name);

    // Replace with your actual element/contenttttt
    cy.url().should('include', '/teams/view');
  });

  it('4. Edit team info', function () {
    Teams.clickEdit();
    Teams.enterName(this.TeamsData.editedTeam.name);
    Teams.updateWorkingType();
    Teams.clickSave();
    Teams.assertTeamVisible(this.TeamsData.editedTeam.name);
  });

it('4. Should Export Teams', function () {
    Teams.Exportteams();
    // Add assertions to verify the export functionality
   const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
  const downloadedFilename = `Teams_${today}.xlsx`;
  
  cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
    });   

});

