import LoginPage from '../Pages/LoginPage';
import GroupPage from '../Pages/GroupPage';

describe('Add New Group', () => {
  beforeEach(function () {
    cy.fixture('LoginData').as('LoginData');
    cy.fixture('GroupData').as('GroupData');

    cy.get('@LoginData').then((loginData) => {
      LoginPage.visit();
      LoginPage.login(loginData.admin.email, loginData.admin.password);
      cy.url().should('include', '/pages/dashboard');
    
    });
   GroupPage.visit();
   cy.url().should('include', '/pages/groups/index');
    
  });

  it('Add Normal Group', function () {
    GroupPage.clickAdd();

    cy.get('@GroupData').then((GroupData) => {
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
      GroupPage.selectGroupType(GroupData.groupType);
      GroupPage.clickSave();
      cy.get('.mat-snack-bar-container').should('contain', 'Group Created Successfully');
    }
    });
  });

  it('Update Group name and availability', function () {
  
    cy.get('@GroupData').then((GroupData) => {
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
  });


  it('Search In Group Page By Name', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.openSearch();
      GroupPage.EnterGroupName(GroupData.updateName);
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', GroupData.updateName);

    });
  });

it('Search In Group Page By Group Type', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.openSearch();
      GroupPage.selectGrouptypeInsearch(GroupData.groupType);
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', GroupData.groupType);

    });
  });

it('Search In Group Page By Group Availability', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.openSearch();
      GroupPage.selectGroupAvailability('No'); 
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', GroupData.updateAvailability); 

    });
  });




  it('Add Contacts Manually', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.clickEdit();
      GroupPage.AddContactsmanually();
      GroupPage.enterMobilenumber(GroupData.mobileNumber);
      GroupPage.ClickSaveFormanuallycontacts();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Contact Created Successfully');

    });
  });

  it('Search in Group Contacts List', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.clickEdit();
      GroupPage.searchWithmobileNumber(GroupData.mobileNumber);
      GroupPage.clickSearchincontactslist();
      GroupPage.getSearchResults().should('contain', GroupData.mobileNumber);

    });
  });

it('clear from Group Contacts List', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.clickEdit();
      GroupPage.searchWithmobileNumber(GroupData.mobileNumber);
      GroupPage.clickClearingroupcontactslist();
      GroupPage.getSearchResults().should('have.value', '');

    });
  });

it('Delete from Group Contacts List', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.clickEdit();
      GroupPage.deleteContactsfromList();
      GroupPage.ConfirmdeleteContactsfromList();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Contact Deleted Successfully');

    });
  }); 

it('Upload File in Normal Group', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.Clickonfilebutton();
      GroupPage.Clickonaddfilebutton();
      cy.get('input[type="file"]').attachFile('1K Vodafone.xlsx');
      cy.wait(500);
      GroupPage.Clickonsavebuttonforuploadfile();
      cy.get('.mat-snack-bar-container', { timeout: 20000 }).should('contain', 'File uploaded successfully');
       
    });
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
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.Clickonfilebutton();
      GroupPage.enterfilename(GroupData.fileName);
      GroupPage.ClickSearchButtonInFilePege();
      GroupPage.getSearchResults().should('contain', GroupData.fileName);
    });
  });

it('Clear From file page', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.Clickonfilebutton();
      GroupPage.enterfilename(GroupData.fileName);
      GroupPage.ClickClearButtonInFilePege();
      GroupPage.getSearchResults().should('have.value', '');
    });
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
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.ClickOnDeleteGroupButton();
      GroupPage.ClickOnConfirmDeleteGroupButton();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Deleted Successfully');

    });
  }); 


  it('Add Custom Group', function () {
    cy.get('@GroupData').then((GroupData) => {
      
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
      GroupPage.selectGroupType(GroupData.customGrouptype);
      GroupPage.clickSave();
      cy.get('.mat-snack-bar-container').should('contain', 'Group Created Successfully');
    }
    });
  });

  it('Update Custom Group name and availability', function () {
    cy.get('@GroupData').then((GroupData) => {
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
  });

it('Search In Group Page By Custom Group Typy', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.openSearch();
      GroupPage.selectGrouptypeInsearch(GroupData.customGrouptype);
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', GroupData.customGrouptype);

    });
  });

it('Search In Group Page By Custom Group Name', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.openSearch();
      GroupPage.EnterGroupName('Update Custom Group');
      GroupPage.ClickOnSearchButtonOnGroupPage();
      GroupPage.getSearchResults().should('contain', GroupData.updateCustomname);

    });
  });

it.only('Upload File in Custom Group', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.Clickonfilebutton();
      GroupPage.Clickonaddfilebutton();
      cy.get('input[type="file"]').attachFile('1K Vodafone Custom.xlsx');
      cy.wait(500);
      GroupPage.Clickonsavebuttonforuploadfile();
      cy.get('.mat-snack-bar-container', { timeout: 20000 }).should('contain', 'File uploaded successfully');
       
    });
  });

it.only('Export the Excel file for custom group', () => {
    // Click the Export to Excel button
    GroupPage.clickEdit();
    GroupPage.ExportGroup();

    // Wait for the file to be downloaded
const today = new Date().toISOString().slice(0,10).replace(/-/g, '');
const downloadedFilename = `Groups_${today}.xlsx`;

cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')
  }); 

it('Delete from Custom Group Contacts List', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.clickEdit();
      GroupPage.deleteContactsfromList();
      GroupPage.ConfirmdeleteContactsfromList();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Contact Deleted Successfully');

    });
  }); 
  
it('Delete Custom Group', function () {
    cy.get('@GroupData').then((GroupData) => {
      GroupPage.ClickOnDeleteGroupButton();
      GroupPage.ClickOnConfirmDeleteGroupButton();
      cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Deleted Successfully');

    });
  }); 
  

}); 


