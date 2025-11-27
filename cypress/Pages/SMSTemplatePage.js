class SMSTemplate {

    visit() {
        cy.contains('span.nav-link-text', 'SMS Templates').click();
    }

    AddNewTemplate(Name, Body) {
        cy.get('span').contains('Create Template').click();
        cy.get('.mat-form-field-flex').type(Name)
        cy.get('span').contains('Select Channel').click();
        cy.get('.pure-checkbox > label').click()

        cy.get('#body').type(Body)
        cy.get('span').contains('Save').click();




    }
    openSearch() {
        cy.get('div.search-form-expand-wrapper').then($wrapper => {
            const isVisible = $wrapper.css('opacity') === '1';
            if (!isVisible) {
                cy.get('.card-head-btns-wrapper > .btn-black').click();

                // Wait for the panel to become visible after clicking
                cy.get('div.search-form-expand-wrapper', { timeout: 10000 })
                    .should('have.css', 'opacity', '1');
            }
        });
    }

    SearchByName(Name) {
        cy.get('input[formcontrolname="templateName"]').type(Name);
        cy.get('span').contains('Search ').click();


    }

    SerchByAvailablity() {
        cy.get(':nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').click();
        cy.get('span').contains(' Yes ').click();
        cy.get('span').contains('Search ').click();


    }
    SerchByChannel() {
        cy.get('mat-select[formcontrolname="channelId"]').click();
        cy.get('mat-option .mat-option-text').contains('SMS').click();


        cy.get('span').contains('Search ').click();



    }
    Clear() {

        cy.get('span').contains('Clear').click();


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