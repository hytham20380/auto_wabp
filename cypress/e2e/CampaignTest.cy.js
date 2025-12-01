import CampaignPage from '../Pages/CampaignPage';
import BasePage from '../Pages/BasePage';


describe('Campaign Page Tests Using Fixtures', () => {

  BasePage.init(CampaignPage, 'CampaignData');

  it('Should create Onspot campaigns Successfully', function () {

    const data = BasePage.generateCampaignData(this.CampaignData);

    CampaignPage.AddNewCampaignInfoTab(data.dynamicCampaignName, this.CampaignData.ChannelName);
    CampaignPage.ContactsTab(data.dynamicMobileNumber);
    CampaignPage.TemplateTab(data.randomTemplate);
    cy.wait(3000); // Waits for 3 seconds
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });

  it('Should create Onspot campaigns with custom group Successfully', function () {

    const data = BasePage.generateCampaignData(this.CampaignData);
    CampaignPage.customGroupCamp(data.dynamicCampaignName, data.randomTemplate, this.CampaignData.ChannelName)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });

('Should create Scheduled campaigns Successfully', function () {
    const data = BasePage.generateCampaignData(this.CampaignData);

    CampaignPage.ScheduleCampaignInfoTab(data.dynamicCampaignName, this.CampaignData.ChannelName);
    CampaignPage.ContactsTab(data.dynamicMobileNumber);
    CampaignPage.TemplateTab(data.randomTemplate);
    cy.wait(3000); // Waits for 3 seconds
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')



  });

  it('Should Search by the Campaign Title Successfully', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.campaigns[0].CampaignName);
    cy.get('.example-element-row > .cdk-column-title').should('contain', this.CampaignData.campaigns[0].CampaignName)

  });

  it('Should Search by Onspot Sending Type Successfully', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByOnspotCmapaign();
    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Onspot')

  });

  it('Should Search by Scheduled Sending Type Successfully', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByScheduledCmapaign()
    cy.get(':nth-child(1) > .cdk-column-sendingType > .badge-status').should('contain', 'Scheduled')
  });

  it('Should Search by Sending Status Successfully', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchBySendingStatus();
    cy.get('.example-element-row > .cdk-column-sendingStatus').should('contain', 'Sent')

  });

  it('Should Duplicate The Campaign without any changing ', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot);
    CampaignPage.DuplicateWithoutChanging();
    cy.wait(500)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')

  });


  it('Should Duplicate the campaign with changing from Custom to Normal ', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.CustomOnspot)
    CampaignPage.CustomToNormal(this.CampaignData.MobileNumber)
    cy.wait(500)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from Normal to Custom ', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot)
    CampaignPage.NormalToCutom()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


  it('Should Duplicate the campaign with changing from onspot to schedual', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalOnspot)
    CampaignPage.OnspotToScheduled();
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });

  it('Should Duplicate the campaign with changing from schedual to onspot ', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.NormalSchedual)
    CampaignPage.ScheduledToOnspot()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


  it('Should Duplicate the campaign with changing The template ', function () {
    CampaignPage.openSearch()
    CampaignPage.SearchByCampaignName(this.CampaignData.randomcamp)
    CampaignPage.DuplicateChangeTemp(this.CampaignData.tempName)
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Campaign Created Successfully')


  });


});




