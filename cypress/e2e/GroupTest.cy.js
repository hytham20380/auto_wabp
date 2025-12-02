import GroupPage from '../Pages/GroupPage';
import BasePage from '../Pages/BasePage';


describe('Add New Group', () => {

  BasePage.init(GroupPage, 'GroupData');
  it('Add Normal Group', function () {
    GroupPage.clickAdd();

    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.groupName);

    GroupPage.addGroupName(dynamiGroupBasenName);
    GroupPage.selectGroupType(this.GroupData.groupType);
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container').should('contain', 'Group Created Successfully');


  });

  it('Update Group name and availability', function () {


    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.updateName);

    GroupPage.clickEdit()
    GroupPage.updateGroupName(dynamiGroupBasenName);
    GroupPage.updateAvailabilty();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container').should('contain', 'Group Updated Successfully');


  });


  it('Search In Group Page By Name', function () {

    BasePage.openSearch();
    GroupPage.EnterGroupName(this.GroupData.updateName);
    GroupPage.ClickOnSearchButtonOnGroupPage();
    GroupPage.getSearchResults().should('contain', this.GroupData.updateName);


  });


  it('Clear Search fields', function () {

    BasePage.openSearch();
    GroupPage.EnterGroupName(this.GroupData.updateName);
    BasePage.clickClear();
    cy.get('input[data-placeholder="Group Name"]').should('have.value', '');


  });

  it('Search In Group Page By Group Type', function () {

    BasePage.openSearch();
    GroupPage.selectGrouptypeInsearch(this.GroupData.groupType);
    GroupPage.ClickOnSearchButtonOnGroupPage();
    GroupPage.getSearchResults().should('contain', this.GroupData.groupType);


  });

  it('Search In Group Page By Group Availability', function () {

    BasePage.openSearch();
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
    BasePage.clickClear();
    GroupPage.getSearchResults().should('have.value', '');


  });

  it('Delete from Group Contacts List', function () {

    GroupPage.clickEdit();
    BasePage.Delete();
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
    BasePage.Export('Groups');
  });


  it('Search in file page', function () {

    GroupPage.Clickonfilebutton();
    GroupPage.enterfilename(this.GroupData.fileName);
    GroupPage.ClickSearchButtonInFilePege();
    GroupPage.getSearchResults().should('contain', this.GroupData.fileName);

  });

  it('Clear From file page', function () {

    GroupPage.Clickonfilebutton();
    GroupPage.enterfilename(this.GroupData.fileName);
    BasePage.clickClear();
    GroupPage.getSearchResults().should('have.value', '');

  });


  it('Export Group Contacts', () => {
    // Click the Export to Excel button
    BasePage.Export('Groups');
  });



  it('Delete Normal Group', function () {
    BasePage.Delete();
    cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Deleted Successfully');


  });



  it('Add Custom Group', function () {


    GroupPage.clickAdd();

    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.customGroupname);

    GroupPage.updateGroupName(dynamiGroupBasenName);
    GroupPage.selectGroupType(this.GroupData.customGrouptype);
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container').should('contain', 'Group Created Successfully');


  });

  it('Update Custom Group name and availability', function () {

    GroupPage.clickEdit();
    const dynamiGroupBasenName = BasePage.generateDynamicName(this.GroupData.updateCustomname);


    GroupPage.updateGroupName(dynamiGroupBasenName);
    GroupPage.updateAvailabilty();
    GroupPage.clickSave();
    cy.get('.mat-snack-bar-container').should('contain', 'Group Updated Successfully');


  });

  it('Search In Group Page By Custom Group Typy', function () {

    BasePage.openSearch();
    GroupPage.selectGrouptypeInsearch(this.GroupData.customGrouptype);
    GroupPage.ClickOnSearchButtonOnGroupPage();
    GroupPage.getSearchResults().should('contain', this.GroupData.customGrouptype);


  });

  it('Search In Group Page By Custom Group Name', function () {

    BasePage.openSearch();
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
    BasePage.Export('Groups');
  });

  it('Delete from Custom Group Contacts List', function () {

    GroupPage.clickEdit();
    BasePage.Delete();
    cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Contact Deleted Successfully');


  });

  it('Delete Custom Group', function () {

    BasePage.Delete();
    cy.get('.cdk-overlay-container', { timeout: 10000 }).should('contain', 'Group Deleted Successfully');


  });


});


