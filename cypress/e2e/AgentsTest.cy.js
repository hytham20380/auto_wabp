import AgentsPage from '../Pages/AgentsPage';
import BasePage from '../Pages/BasePage';

describe('Agents Page Tests Using Fixtures', () => {

  BasePage.init(AgentsPage, 'AgentsData');

  it('Should add a new agent successfully', function () {
  // Generate random suffix between 100–999
  const randomSuffix = Cypress._.random(100, 999);

  // Build dynamic agent name & email
  const dynamicFullName = `${this.AgentsData.FullName} ${randomSuffix}`;
  const dynamicEmail = `${randomSuffix}_${this.AgentsData.email}`;

  // Random integration ID also
  const integrationId = Math.floor(1000 + Math.random() * 9000).toString();

  // Use dynamic values
  AgentsPage.AddNewAgent(dynamicFullName, dynamicEmail, integrationId);

  cy.get('.mat-simple-snack-bar-content')
    .should('contain', 'Agent created successfully');
    
});


  it('Search by Name', function () {

    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.FullName);
    cy.get('.mat-row > .cdk-column-adminName').should('contain', this.AgentsData.FullName);

  });

  it('Search by Email', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.email);
    cy.get('.mat-row > .cdk-column-email').should('contain', this.AgentsData.email);


  });

  it('Clear', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.email);
    AgentsPage.clearButton();
    cy.get('input[data-placeholder="Email"]').should('have.value', '');

  });


  it('Edit name and email', function () {
  // Generate random suffix between 100–999
  const randomSuffix = Cypress._.random(100, 999);

  // Create dynamic edit name & email
  const dynamicEditName = `${this.AgentsData.editname} ${randomSuffix}`;
  const dynamicEditEmail = `${randomSuffix}_${this.AgentsData.editemail}`;

  // Search using the original name
  AgentsPage.openSearch();
  AgentsPage.SearchByName(this.AgentsData.FullName);

  // Edit using dynamic values
  AgentsPage.EditAgent(dynamicEditName, dynamicEditEmail);

  cy.get('.mat-simple-snack-bar-content')
    .should('contain', 'Agent updated successfully');
    
});



  it('should Be the user not active ', function () {
   
    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
     cy.wait(1000);
    AgentsPage.changetoNotactive();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent deactivated successfully')
  })

  it('should Be the user active ', function () {
        
    AgentsPage.openSearch();
    AgentsPage.SearchByName(this.AgentsData.editname);
    cy.wait(1000);
    AgentsPage.changetoActive();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent activated successfully')
  })

  it('Delete The agent', function () {
    AgentsPage.openSearch();
    AgentsPage.SearchByEmail(this.AgentsData.editemail);
    AgentsPage.DeleteAgent();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Agent deleted successfully')
  })

  it('should export the Excel file', () => {
    // Click the Export to Excel button
    AgentsPage.ExportAgents();

    // Wait for the file to be downloaded
const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
const downloadedFilename = `Agents_${today}.xlsx`;

cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
  })


});
