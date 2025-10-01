import LoginPage from '../pages/LoginPage';
import SMSTemplate from '../Pages/SMSTemplatePage';

describe('Shpuld Add New SMS Template Successfully  ', () => {

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


    SMSTemplate.visitTemplate();
    cy.url().should('include', '/pages/smsTemplates'); // ✅ expected path
    cy.fixture('SMSTemplateData').then((data) => {
      cy.wrap(data).as('SMSTemplateData'); // 🔹 Store fixture data globally
    });

  });
  
  it('Should Add New SMS Template Successfully', function () {
      const campaignsNeeded = 1;
      // to ensure the number is not repeated
      const usedSuffixes = new Set();
  
      while (usedSuffixes.size < campaignsNeeded) {
  // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);
  // skip لو الرقم اتكرر
      if (usedSuffixes.has(randomSuffix)) continue
      usedSuffixes.add(randomSuffix);
  // استخدم القيمة من الـ fixture كـ base
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
    SMSTemplate.SearchByName(this.SMSTemplateData.TemplateName[0]);
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