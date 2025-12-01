import BasePage from "./BasePage";  

class SMSTemplate extends BasePage {

    visit() {
        cy.contains('span.nav-link-text', 'SMS Templates').click();
    }

    AddNewTemplate(Name, Body) {
        super.clickCreate();
        cy.get('.mat-form-field-flex').type(Name)
        cy.get('span').contains('Select Channel').click();
        cy.get('.pure-checkbox > label').click()

        cy.get('#body').type(Body)
        super.clickSave();



    }
    openSearch() {
        super.openSearch();
    }

    SearchByName(Name) {
        cy.get('input[formcontrolname="templateName"]').type(Name);
        super.clickSearch();


    }

    SerchByAvailablity() {
        cy.get(':nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').click();
        cy.get('span').contains(' Yes ').click();
        super.clickSearch();

    }
    SerchByChannel() {
        cy.get('mat-select[formcontrolname="channelId"]').click();
        cy.get('mat-option .mat-option-text').contains('SMS').click();


        super.clickSearch();


    }
    Clear() {

        super.clickClear();

    }

    ChangeToNotAvailable() {
        // استهداف أول صف في الجدول - عمود Availability
        cy.get('table tbody tr')
            .first()
            .find('mat-slide-toggle input[type="checkbox"]')
            .uncheck({ force: true });



        cy.get('.mat-dialog-container').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click();





    }
    ChengeToAvailable() {
        cy.get('table tbody tr')
            .first()
            .find('mat-slide-toggle input[type="checkbox"]')
            .check({ force: true });
        cy.get('.mat-dialog-actions > .btn-black').click();
        //cy.get('#mat-dialog-0').should('be.visible').click();

    }
    ExportTemplate() {

    }

}
export default new SMSTemplate();