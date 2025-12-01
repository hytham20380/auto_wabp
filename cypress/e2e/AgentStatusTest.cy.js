import AgentStatus from '../Pages/AgentStatusPage';
import BasePage from '../Pages/BasePage';


describe('Agents Status Page Tests Using Fixtures', () => {

  BasePage.init(AgentStatus, 'AgentStatusData');

  it('Should Add New Active Status Successfully ', function(){
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


   it('Should Add New InActive Status Successfully ', function(){
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
   
  it('Should Edit a status Successfully',function () {
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
