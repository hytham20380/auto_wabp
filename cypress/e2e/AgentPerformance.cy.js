import LoginPage from '../Pages/LoginPage';
import AgentPerformancePage from '../Pages/AgentPerformancePage';
import BasePage from "./BasePage";


describe('Agents Performance Page Tests Using Fixtures', () => {
  /*
    beforeEach(function () {
      // Load fixtures first
      cy.fixture('LoginData').as('LoginData');
      cy.fixture('AgentPerformance').as('AgentPerformance');
  
  
      // Perform login and wait for successful navigation
      cy.get('@LoginData').then((loginData) => {
        LoginPage.visit();
        LoginPage.login(loginData.admin.email, loginData.admin.password);
  
        // Wait for successful login (adjust the selector to match your app)
        cy.url().should('not.include', '/auth/login');
      });
        // Navigate to Agent Performance page
      AgentPerformancePage.visitAgentPerformance();
       cy.url().should('include', '/pages/report/agentPerformance'); // ✅ expected path
      
      });
  
    */
  BasePage.init(AgentPerformancePage, 'AgentStatusData')

  it('Should search for agent by name and show results', function () {

    const agentName = this.AgentPerformance.agentName;

    AgentPerformancePage.searchByName(agentName);

    AgentPerformancePage.elements.tableRows()
      .should('have.length.greaterThan', 0);

    AgentPerformancePage.elements.tableCell(1, 1)
      .should('contain', agentName);

  });


  it.only('Should search for agent by Date', function () {


    AgentPerformancePage.filterByDate("2025-08-01", "2025-10-31");

    AgentPerformancePage.elements.tableRows()
      .should('have.length.greaterThan', 0);
    cy.wait(3000);
  });


});
