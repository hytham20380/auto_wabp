import LoginPage from '../Pages/LoginPage';
import ClientsChatReport from '../Pages/ClientsChatReport';

describe('Clients Chat Report Tests Using Fixtures', () => {

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

    ClientsChatReport.VisitClientsChatReport()

    cy.fixture('ClientsChatData').then((data) => {
      cy.wrap(data).as('ClientsChatData'); // 🔹 Store fixture data globally
    });

  });
  it('Should Search by the mobile number and return related values successfully ', function () {
    ClientsChatReport.SearchByMobileNumber(this.ClientsChatData.MobileNumber);
    cy.get('td.mat-column-clientMobileNumber').should('contain.text', this.ClientsChatData.MobileNumber);



  })
  it('Should Search by the Client name and return related values successfully ', function () {
    ClientsChatReport.SearchByClientName(this.ClientsChatData.CleintName);
    cy.get('td.mat-column-clientName').should('contain.text', this.ClientsChatData.CleintName);


  })
  it('Should Search by the channel type and return related values successfully ', function () {

    ClientsChatReport.SearchByChannelType();
    cy.get('tbody > :nth-child(1) > .cdk-column-channelTypeName').should('contain', 'WhatsApp')


  })
  it('Should Search by the agent name and return related values successfully ', function () {
    ClientsChatReport.SerchByAgentName(this.ClientsChatData.AgentName)

    cy.get('tbody > :nth-child(1) > .cdk-column-agentName').should('contain', this.ClientsChatData.AgentName)
    
  })
  it('Should clear the fields succeefully  ', function () {
    ClientsChatReport.SearchByClientName(this.ClientsChatData.CleintName)
    ClientsChatReport.Clear();
    cy.get('input[formcontrolname="clientName"]').should('have.value', '');

  })
  it('Should Export the data as the view of the grid  successfully ', function () {
    ClientsChatReport.SearchByClientName(this.ClientsChatData.CleintName)

    ClientsChatReport.ExportFile()
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const downloadedFilename = `Client Chat Report_${today}.xlsx`;
    cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')

  })
  it('Should Naviagate to the chat page successfully ', function () {
    ClientsChatReport.ViewChat();
    cy.url().should('include', '/AdminTool/pages/clients/details/');



  })
  it('Should View the Support History successfully ', function () {
    ClientsChatReport.ViewSupportHistory();
    cy.get('#mat-dialog-0').should('contain','Support History')
    


  })

});
