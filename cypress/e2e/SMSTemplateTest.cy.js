import SMSTemplate from '../Pages/SMSTemplatePage';
import BasePage from '../Pages/BasePage';


describe('Shpuld Add New SMS Template Successfully  ', () => {

  BasePage.init(SMSTemplate, 'SMSTemplateData');

  it('Should Add New SMS Template Successfully', function () {
      const campaignsNeeded = 1;
      // to ensure the number is not repeated
      const usedSuffixes = new Set();
  
      while (usedSuffixes.size < campaignsNeeded) {
  // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);
  // skip if the number is repeated
      if (usedSuffixes.has(randomSuffix)) continue
      usedSuffixes.add(randomSuffix);

      const TemplateBase = this.SMSTemplateData.TemplateName[0];
      const dynamicTemplateName = `${TemplateBase}${randomSuffix}`;

      SMSTemplate.AddNewTemplate(dynamicTemplateName, this.SMSTemplateData.Body);
      cy.get('.mat-simple-snack-bar-content').should('contain', 'Template Created Successfully')
 
      }
        });

  it ('Should search by Template name successfully',function(){


    SMSTemplate.openSearch();
    SMSTemplate.SearchByName(this.SMSTemplateData.TemplateName[0]);
    cy.get('tbody > :nth-child(1) > .cdk-column-name').should('contain','Auto SMS Template')

})
    
  it ('Should search by Template availability successfully',function(){


    SMSTemplate.openSearch();
    SMSTemplate.SerchByAvailablity();
    cy.get('tbody > :nth-child(1) > .cdk-column-availability').should('contain','Yes')

})

  it ('Should search by Channel name successfully',function(){


    SMSTemplate.openSearch();
    SMSTemplate.SerchByChannel();
    cy.get('tbody > :nth-child(1) > .cdk-column-channel').should('contain','SMS')

})
  it ('Should clear the data successfully',function(){


    SMSTemplate.openSearch();
    SMSTemplate.SearchByName(this.SMSTemplateData.TemplateName[0]);
    SMSTemplate.Clear()
    cy.get('input[formcontrolname="templateName"]').should('have.value','')

})
    
  it ('Should change the template to unavailable successfully',function(){
    SMSTemplate.openSearch();
    SMSTemplate.SerchByAvailablity();
    SMSTemplate.ChangeToNotAvailable()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Template deactivated successfully')


})

  it ('Should change the template to available successfully',function(){
    SMSTemplate.openSearch();
    SMSTemplate.SearchByName(this.SMSTemplateData.TemplateName[0]);
    SMSTemplate.ChengeToAvailable()
    cy.get('.mat-simple-snack-bar-content').should('contain', 'Template activated successfully')


})



  
});