import LoginPage from '../Pages/LoginPage';
import TeamsPage from '../Pages/Teams';

describe('Teams Page Functionality', () => {
  beforeEach(() => {
    cy.fixture('LoginData').as('LoginData');
    cy.fixture('teamsData').as('data');

    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('not.include', '/auth/login');
    });

    TeamsPage.visit();
  });

  it('1. Search for existing team', function () {
    TeamsPage.openSearch();
    TeamsPage.enterName(this.data.team.name);
    TeamsPage.clickSearch();
    TeamsPage.assertTeamVisible(this.data.team.name);
  });

  it('2. Clear search fields', function () {
    TeamsPage.openSearch();
    TeamsPage.enterName(this.data.team.name);
    TeamsPage.selectWorkingType();
    TeamsPage.clickClear();

    cy.get(".mat-select-min-line").should('contain', 'All');
  });

  it('3. View team details', function () {
    TeamsPage.clickView(this.data.team.name);

    // Replace with your actual element/contenttttt
    cy.url().should('include', '/teams/view');
  });

  it('4. Edit team info', function () {
    TeamsPage.clickEdit();
    TeamsPage.enterName(this.data.editedTeam.name);
    TeamsPage.updateWorkingType();
    TeamsPage.clickSave();
    TeamsPage.assertTeamVisible(this.data.editedTeam.name);
  });

it('4. Should Export Teams', function () {
    TeamsPage.Exportteams();
    // Add assertions to verify the export functionality
   const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
  const downloadedFilename = `Teams_${today}.xlsx`;
  
  cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
    });   

});

