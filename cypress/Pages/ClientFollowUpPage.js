class ClientFollowUp {

    visit() {
        cy.contains('a', 'Client Follow-Ups').click()

    }


    SendMessage(ChannelName, TemplateName, MobileNumber) {
        cy.contains('span', 'Send Message').click();
        cy.contains('span', 'Select Channel').click();
        cy.contains('li', ChannelName).find('input[type="checkbox"]').check({ force: true });
        cy.contains('span', 'Select Template').click();
        cy.contains('li', TemplateName).find('input[type="checkbox"]').check({ force: true });
        cy.get('.ng-invalid > .iti > #phone').type(MobileNumber);
        cy.contains('span', 'send').click();

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

    SerchByMobileNum(MobileNumber) {
        cy.get('#phone').type(MobileNumber);
        cy.contains('span', 'Search').click();


    }
    Clear() {


        cy.get('.btn-transparent').click()
        cy.get('span').contains('Clear').click()

    }


    ValidationMessages() {
        cy.contains('span', 'Send Message').click();
        cy.contains('span', 'send').click();

    }

    MobileValidation(ChannelName, TemplateName, MobileNumber) {
        cy.contains('span', 'Send Message').click();
        cy.contains('span', 'Select Channel').click();
        cy.contains('li', ChannelName).find('input[type="checkbox"]').check({ force: true });
        cy.contains('span', 'Select Template').click();
        cy.contains('li', TemplateName).find('input[type="checkbox"]').check({ force: true });
        cy.get('.ng-invalid > .iti > #phone').type(MobileNumber);
        cy.contains('span', 'send').click();


    }
    Export() {
        cy.get('button[title="Export To Excel"]').click()

    }






}
export default new ClientFollowUp();
