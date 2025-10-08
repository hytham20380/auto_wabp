import LoginPage from '../pages/LoginPage';
import SmsCampaignPage from '../pages/SmsCampaignPage';

describe('Sms Campaign tests', () => {
  beforeEach(function () {
    // Load fixtures
    cy.fixture('LoginData').as('LoginData');
    cy.fixture('SmsCampaign').as('SmsCampaign');

    // Perform login and visit SMS Campaign page before every test
    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);
      cy.url().should('include', '/pages/dashboard');

      SmsCampaignPage.visitSmsCampaign();
    });
  });

  it('should login and visit SMS campaign page', function () {
    cy.log('Already logged in and on SMS Campaign page');
  });

//Note: TO run all templates language you should run the creation script 5 times.
  it('Should create Onspot campaigns Successfully', function () {
    const campaignsNeeded = 1;
    const usedSuffixes = new Set();

    cy.get('@SmsCampaign').then((SmsCampaign) => {
      while (usedSuffixes.size < campaignsNeeded) {
        const randomSuffix = Cypress._.random(100, 999);
        if (usedSuffixes.has(randomSuffix)) continue;
        usedSuffixes.add(randomSuffix);

        const campaignBase = SmsCampaign.smsCampaigns[0];
        const dynamicMobileNumber = `${campaignBase.BaseMobileNumber}${randomSuffix}`;
        const dynamicCampaignName = `${campaignBase.CampaignName} ${randomSuffix}`;

        const randomTemplate = Cypress._.sample(SmsCampaign.templateNames);

        SmsCampaignPage.AddNewSmsCampaignInfoTab(dynamicCampaignName);
        SmsCampaignPage.ContactsTab(dynamicMobileNumber);
        SmsCampaignPage.TemplateTab(randomTemplate);

        cy.wait(3000);
        cy.get('.mat-simple-snack-bar-content')
          .should('contain', 'Campaign Created Successfully');
      }
    });
  });

  it('Should create Onspot campaigns with custom group Successfully', function () {
    cy.get('@SmsCampaign').then((SmsCampaign) => {
      const campaignsNeeded = 1;
      const usedSuffixes = new Set();
  

      while (usedSuffixes.size < campaignsNeeded) {
        const randomSuffix = Cypress._.random(100, 999);
        if (usedSuffixes.has(randomSuffix)) continue;
        usedSuffixes.add(randomSuffix);

        const campaignBase = SmsCampaign.smsCampaigns[0];
        const dynamicCampaignName = `${campaignBase.CampaignName} ${randomSuffix}`;

        SmsCampaignPage.customGroupCamp(dynamicCampaignName, this.SmsCampaign.templateNames[1]);

        cy.get('.mat-simple-snack-bar-content')
          .should('contain', 'Campaign Created Successfully');
      }
    });
  });

it('Should create Onspot campaigns with Normal group Successfully', function () {
    cy.get('@SmsCampaign').then((SmsCampaign) => {
      const campaignsNeeded = 1;
      const usedSuffixes = new Set();

      while (usedSuffixes.size < campaignsNeeded) {
        const randomSuffix = Cypress._.random(100, 999);
        if (usedSuffixes.has(randomSuffix)) continue;
        usedSuffixes.add(randomSuffix);

        const campaignBase = SmsCampaign.NormalSchedual;
        const dynamicCampaignName = `${campaignBase} ${randomSuffix}`;

        // استدعاء مباشر من object المستورد
        SmsCampaignPage.normalGroupCamp(dynamicCampaignName, SmsCampaign.templateNames[1]);
        
        cy.get('.mat-simple-snack-bar-content', { timeout: 10000 }).should('contain', 'Campaign Created Successfully');

      }
    });
});

  it('Should create Scheduled campaigns Successfully', function () {
    cy.get('@SmsCampaign').then((SmsCampaign) => {  
      const campaignsNeeded = 1;
      const usedSuffixes = new Set();

      while (usedSuffixes.size < campaignsNeeded) {
        const randomSuffix = Cypress._.random(100, 999);
        if (usedSuffixes.has(randomSuffix)) continue;
        usedSuffixes.add(randomSuffix);

        const campaignBase = SmsCampaign.smsCampaigns[0];
        const dynamicMobileNumber = `${campaignBase.BaseMobileNumber}${randomSuffix}`;
        const dynamicCampaignName = `${campaignBase.CampaignName} ${randomSuffix}`;

        const randomTemplate = Cypress._.sample(SmsCampaign.templateNames);

        SmsCampaignPage.ScheduleCampaignInfoTab(dynamicCampaignName);
        SmsCampaignPage.ContactsTab(dynamicMobileNumber);
        SmsCampaignPage.TemplateTab(randomTemplate);

        cy.wait(3000);
        cy.get('.mat-simple-snack-bar-content')
          .should('contain', 'Campaign Created Successfully');
      }
    
    });
    });
  it('Should Search by the Campaign Title Successfully', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.smsCampaigns[0].CampaignName);
    cy.get('.example-element-row > .cdk-column-title').should('contain', this.SmsCampaign.smsCampaigns[0].CampaignName)

  });



it('Should Search by Onspot Sending Type Successfully', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.SearchBySendingStatus();

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Onspot')


  });

it('Should Search by Sent Sending Status Successfully', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.SearchBySendingStatus()

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Onspot')


  });  

it('Should Search by Scheduled Sending Type Successfully', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.SearchByScheduledCmapaign()

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Scheduled')


  });  
it('Should Clear data Successfully', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.Clearbutton()

    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('have.value', '');


 
 });    
it('Should Duplicate The Campaign without any changing ', function () {
    SmsCampaignPage.DuplicateWithoutChanging();
    cy.wait(500)

    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  }); 
it('Should Duplicate the campaign with changing from onspot to schedual', function () {
    SmsCampaignPage.openSearch()
    SmsCampaignPage.SearchByOnspotCmapaign();
    SmsCampaignPage.OnspotToScheduled();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  }); 

  it('Should Duplicate the campaign with changing from schedual to onspot ', function () {
      
    SmsCampaignPage.openSearch()
  
      SmsCampaignPage.SearchByScheduledCmapaign()
  
      SmsCampaignPage.ScheduledToOnspot()
      cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')
  
  
    });
  
it('Should Duplicate the campaign with changing from Custom to Normal ', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.CustomOnspot)

    SmsCampaignPage.CustomToNormal(this.SmsCampaign.MobileNumber , this.SmsCampaign.templateNames[1]);
    cy.wait(500)

    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  }); 
it('Should Duplicate the campaign with changing from Normal to Custom ', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.NormalSchedual)

    SmsCampaignPage.NormalToCutom()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });
it('Should Duplicate the campaign with changing The template ', function () {
    SmsCampaignPage.openSearch()

    SmsCampaignPage.SearchByCampaignName(this.SmsCampaign.NormalSchedual)

    SmsCampaignPage.DuplicateChangeTemp(this.SmsCampaign.templateNames[2]);
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });
it('View Button Should work correctly', function () {
    cy.log('Already logged in and on SMS Campaign page');
    cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(1) > .btn > .ng-tns-c263-21').click();
cy.url().should('include', '/pages/smsCampaigns/report');
  });
  
  it('Export the Excel file for custom group', () => {
      // Click the Export to Excel button
      SmsCampaignPage.ExportSmsCampaign();

      // Wait for the file to be downloaded
  const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
  const downloadedFilename = `Sms Campaigns Report_${today}.xlsx`;
  
  cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
    });   
}); 
  