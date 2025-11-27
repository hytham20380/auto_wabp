import LoginPage from '../Pages/LoginPage';
import GroupPage from '../Pages/GroupPage';
import BasePage from '../Pages/BasePage';


describe('Add New Group', () => {
  /*
  beforeEach(function () {
    cy.fixture('LoginData').as('LoginData');
    //cy.fixture('GroupData').as('GroupData');

    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);
      cy.url().should('include', '/pages/dashboard');
      
    });
    
   GroupPage.visit();
   cy.url().should('include', '/pages/groups/index');
   cy.fixture('GroupData').then((data) => {
      cy.wrap(data).as('GroupData'); // 🔹 Store fixture data globally
    });
    
  });
*/
  BasePage.init(GroupPage, 'GroupData');
  it('Add Normal Group', function () {
    GroupPage.clickAdd();

   
      const GroupNeeded = 1;
      
      const usedSuffixes = new Set();
    while (usedSuffixes.size <GroupNeeded) {
      // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);

      const GroupBase = this.GroupData.groupName ;
      const dynamiGroupBasenName = `${GroupBase} ${randomSuffix}`;
      
      GroupPage.addGroupName(dynamiGroupBasenName);
      GroupPage.selectGroupType(this.GroupData.groupType);
      GroupPage.clickSave();
      cy.get('.mat-snack-bar-container').should('contain', 'Group Created Successfully');
    }
    
  });

  it('Update Group name and availability', function () {
  
   
       const GroupNeeded = 1;
      
      const usedSuffixes = new Set();
    while (usedSuffixes.size <GroupNeeded) {
      // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);

      const GroupBase = this.GroupData.updateName ;
      const dynamiGroupBasenName = `${GroupBase} ${randomSuffix}`;
      
      GroupPage.clickEdit()
      GroupPage.updateGroupName(dynamiGroupBasenName);
      GroupPage.updateAvailabilty();
      GroupPage.clickSave();
      cy.get('.mat-snack-bar-container').should('contain', 'Group Updated Successfully');
    }
   
  });


  it('Search In Group Page By Name', function () {
   
      GroupPage.openSearch();
      GroupPage.EnterGroupName(this.GroupData.updateName);
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', this.GroupData.updateName);

   
  });

it('Search In Group Page By Group Type', function () {
    
      GroupPage.openSearch();
      GroupPage.selectGrouptypeInsearch(this.GroupData.groupType);
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', this.GroupData.groupType);

   
  });

it('Search In Group Page By Group Availability', function () {
    
      GroupPage.openSearch();
      GroupPage.selectGroupAvailability('No'); 
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', this.GroupData.updateAvailability); 

   
  });




  it('Add Contacts Manually', function () {
    
      GroupPage.clickEdit();
      GroupPage.AddContactsmanually();
      GroupPage.enterMobilenumber(this.GroupData.mobileNumber);
      GroupPage.ClickSaveFormanuallycontacts();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Contact Created Successfully');

   
  });

  it('Search in Group Contacts List', function () {
    
      GroupPage.clickEdit();
      GroupPage.searchWithmobileNumber(this.GroupData.mobileNumber);
      GroupPage.clickSearchincontactslist();
      GroupPage.getSearchResults().should('contain', this.GroupData.mobileNumber);

    
  });

it('clear from Group Contacts List', function () {
    
      GroupPage.clickEdit();
      GroupPage.searchWithmobileNumber(this.GroupData.mobileNumber);
      GroupPage.clickClearingroupcontactslist();
      GroupPage.getSearchResults().should('have.value', '');

   
  });

it('Delete from Group Contacts List', function () {
    
      GroupPage.clickEdit();
      GroupPage.deleteContactsfromList();
      GroupPage.ConfirmdeleteContactsfromList();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Contact Deleted Successfully');

   
  }); 

it('Upload File in Normal Group', function () {
    
      GroupPage.Clickonfilebutton();
      GroupPage.Clickonaddfilebutton();
      cy.get('input[type="file"]').attachFile('1K Vodafone.xlsx');
      cy.wait(500);
      GroupPage.Clickonsavebuttonforuploadfile();
      cy.get('.mat-snack-bar-container', { timeout: 20000 }).should('contain', 'File uploaded successfully');
       
   
  });

it('should export the Excel file', () => {
    // Click the Export to Excel button
    GroupPage.ExportGroup();

    // Wait for the file to be downloaded
const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
const downloadedFilename = `Groups_${today}.xlsx`;

cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
  }); 


it('Search in file page', function () {
   
      GroupPage.Clickonfilebutton();
      GroupPage.enterfilename(this.GroupData.fileName);
      GroupPage.ClickSearchButtonInFilePege();
      GroupPage.getSearchResults().should('contain',this.GroupData.fileName);
  
  });

it('Clear From file page', function () {
   
      GroupPage.Clickonfilebutton();
      GroupPage.enterfilename(this.GroupData.fileName);
      GroupPage.ClickClearButtonInFilePege();
      GroupPage.getSearchResults().should('have.value', '');
   
  });


it('Export Group Contacts', () => {
    // Click the Export to Excel button
    GroupPage.ClickOnExportContactsButton();

    // Wait for the file to be downloaded
const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
const downloadedFilename = `Groups_${today}.xlsx`;

cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
  }); 


it('Delete Normal Group', function () {
    
      GroupPage.ClickOnDeleteGroupButton();
      GroupPage.ClickOnConfirmDeleteGroupButton();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Deleted Successfully');

    
});


 
  it('Add Custom Group', function () {
    
      
      GroupPage.clickAdd();
      const GroupNeeded = 1;
      
      const usedSuffixes = new Set();
    while (usedSuffixes.size <GroupNeeded) {
      // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);

      const GroupBase = this.GroupData.customGroupname ;
      const dynamiGroupBasenName = `${GroupBase} ${randomSuffix}`;
      GroupPage.updateGroupName(dynamiGroupBasenName);
      GroupPage.selectGroupType(this.GroupData.customGrouptype);
      GroupPage.clickSave();
      cy.get('.mat-snack-bar-container').should('contain', 'Group Created Successfully');
    }
   
  });

  it('Update Custom Group name and availability', function () {
    
      GroupPage.clickEdit();
      const GroupNeeded = 1;
      
      const usedSuffixes = new Set();
    while (usedSuffixes.size <GroupNeeded) {
      // random values between 100 : 999
      const randomSuffix = Cypress._.random(100, 999);

      // the loop is stopped if the random number is repeated 
      if (usedSuffixes.has(randomSuffix)) continue;
      usedSuffixes.add(randomSuffix);

      const GroupBase = this.GroupData.updateCustomname ;
      const dynamiGroupBasenName = `${GroupBase} ${randomSuffix}`;
      
      GroupPage.updateGroupName(dynamiGroupBasenName);
      GroupPage.updateAvailabilty();
      GroupPage.clickSave();
      cy.get('.mat-snack-bar-container').should('contain', 'Group Updated Successfully');
    }
   
  });

it('Search In Group Page By Custom Group Typy', function () {
   
      GroupPage.openSearch();
      GroupPage.selectGrouptypeInsearch(this.GroupData.customGrouptype);
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', this.GroupData.customGrouptype);

    
  });

it('Search In Group Page By Custom Group Name', function () {
   
      GroupPage.openSearch();
      GroupPage.EnterGroupName('Update Custom Group');
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', this.GroupData.updateCustomname);

   
  });

it('Upload File in Custom Group', function () {
    
      GroupPage.Clickonfilebutton();
      GroupPage.Clickonaddfilebutton();
      cy.get('input[type="file"]').attachFile('1K Vodafone Custom.xlsx');
      cy.wait(500);
      GroupPage.Clickonsavebuttonforuploadfile();
      cy.get('.mat-snack-bar-container', { timeout: 20000 }).should('contain', 'File uploaded successfully');
       
    
  });

it('Export the Excel file for custom group', () => {
    // Click the Export to Excel button
    GroupPage.clickEdit();
    GroupPage.ExportGroup();

    // Wait for the file to be downloaded
const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
const downloadedFilename = `Groups_${today}.xlsx`;

cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
  }); 

it('Delete from Custom Group Contacts List', function () {
   
      GroupPage.clickEdit();
      GroupPage.deleteContactsfromList();
      GroupPage.ConfirmdeleteContactsfromList();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Contact Deleted Successfully');

   
  }); 
  
it('Delete Custom Group', function () {
   
      GroupPage.ClickOnDeleteGroupButton();
      GroupPage.ClickOnConfirmDeleteGroupButton();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Deleted Successfully');

   
  }); 
  

}); 


