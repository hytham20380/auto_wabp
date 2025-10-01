import LoginPage from '../pages/LoginPage';
import AgentStatus from '../Pages/AgentStatusPage';

describe('Agents Status Page Tests Using Fixtures', () => {

  beforeEach(function () {
    // Load fixtures first
    cy.fixture('LoginData').as('LoginData');


    // Perform login and wait for successful navigation
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);

      // Wait for successful login (adjust the selector to match your app)
      cy.url().should('not.include', '/auth/login');
    });


    AgentStatus.VisitAgentStatus()
    cy.url().should('include', '/pages/AdminStatuses'); // ✅ expected path
    cy.fixture('AgentStatusData').then((data) => {
      cy.wrap(data).as('AgentStatusData'); // 🔹 Store fixture data globally
    });

  });
/*
  it ('Should Add New Active Status Successfully ', function(){
    const StausNeeded = 1;

    // to ensure the number is not repeated
    const usedSuffixes = new Set();


    while (usedSuffixes.size < StausNeeded) {
      // random values between 100 : 999
   
     // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);
      const StatusBase = this.AgentStatusData.RandomStatus
      const dynamiStatusName = `${StatusBase} ${randomSuffix}`;

      // choose the template randomly 
     
    AgentStatus.AddActiveNewStatus(dynamiStatusName);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been created successfully.');
    }

  })


   it ('Should Add New InActive Status Successfully ', function(){
    const StausNeeded = 1;

    // to ensure the number is not repeated
    const usedSuffixes = new Set();


    while (usedSuffixes.size < StausNeeded) {
      // random values between 100 : 999
   
     // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);
      const StatusBase = this.AgentStatusData.RandomStatus
      const dynamiStatusName = `${StatusBase} ${randomSuffix}`;

      // choose the template randomly 
    AgentStatus.AddInActiveNewStatus(dynamiStatusName);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been created successfully.');
    }

  })
   
  it ('Should Edit a status Successfully',function () {
    const StausNeeded = 1;

    // to ensure the number is not repeated
    const usedSuffixes = new Set();


    while (usedSuffixes.size < StausNeeded) {
      // random values between 100 : 999
   
     // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);
      const StatusBase = this.AgentStatusData.EditStatus
      const dynamicEditName = `${StatusBase} ${randomSuffix}`;

      // choose the template randomly
    AgentStatus.openSearch()
    AgentStatus.SerchByName(this.AgentStatusData.RandomStatus)
    AgentStatus.EditStatus(dynamicEditName)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been updated successfully.');
    }
  })


  it('Should Search By status name Sucessfully ',function(){
    AgentStatus.openSearch()
    AgentStatus.SerchByName(this.AgentStatusData.EditStatus)
    cy.get('td.mat-column-statusName').contains(this.AgentStatusData.EditStatus).should('be.visible');



  })
  it('Should Search By Active status  Sucessfully ',function(){
    AgentStatus.openSearch()
    AgentStatus.SearchByActiveStatus()
    cy.get('td.mat-column-parentName').contains('Active').should('be.visible');


  })
  it('Should Search By Inactive status Sucessfully ',function(){
    AgentStatus.openSearch()
    AgentStatus.SearchByInActiveStatus()
    cy.get('td.mat-column-parentName').contains('Inactive').should('be.visible');





  })
    
 */
  it('Should set an Online Status', function(){
    AgentStatus.SetActiveStatus()
  })
  it('Should set an Offliine Status', function(){
    AgentStatus.SetInActiveStatus()
  })
  it ('Delete Status That set before and not allowed to delete ', function(){
    AgentStatus.SetInActiveStatus()
    AgentStatus.openSearch()
    AgentStatus.SerchByName(this.AgentStatusData.InActiveStatus)
    AgentStatus.DeleteStatus();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Cannot delete status as it exists in agents\' history.');



    

  })

  it ('Delete Status Successfully ', function(){
    AgentStatus.SetInActiveStatus()
    AgentStatus.openSearch()
    AgentStatus.SerchByName(this.AgentStatusData.RandomStatus)
    AgentStatus.DeleteStatus();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'The agent status has been deleted successfully.');



    

  })

  


});
