import BasePage from "./BasePage";


class RolesPage extends BasePage {
    visit() {
        // cy.visit('/pages/roles')
        cy.contains('span.nav-link-text' , 'Terms & Roles').click();
    }

    AddNewRole(Name) {
        super.clickAddNew();
        cy.get('input[formcontrolname="enName"]').type(Name);
        cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        super.clickSave();


    }
    openSearch() {
        super.openSearch();
    }


    SearchByName(Name) {
        cy.get('input[formcontrolname="roleName"]').type(Name);
        super.clickSearch();
    


    }
    EditRole(Name) {
        super.clickEdit();
        cy.get('input[formcontrolname="enName"]').clear().type(Name);
        cy.get('#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        cy.get('#mat-checkbox-13 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
        super.clickSave();


    }
    Clear() {

        super.clickClear();

    }
    DeleteRole() {
        super.clickDelete();
        super.confirmDialog();


    }   
}


export default new RolesPage();