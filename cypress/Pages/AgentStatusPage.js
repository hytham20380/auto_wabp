class AgentStatus {

    VisitAgentStatus() {
        cy.get('span.nav-link-text').contains('Agent Statuses').click();

    }
    
    AddInActiveNewStatus(RandomStatus) {

        cy.get('span').contains('Add New Status').click();
        cy.get('span').contains('Select Parent Status').click();
        cy.get('li.pure-checkbox').contains('Inactive').parents('li').find('input[type="checkbox"]').check({ force: true });
        cy.get('input[formcontrolname="statusName"]').type(RandomStatus);
        cy.get('input[formcontrolname="statusColor"]')
            .then(($input) => {
                const nativeInput = $input[0];
                nativeInput.value = '#c25fe9ff';
                // dispatch proper Angular events
                nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
                nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
                cy.get('.btn').click()


            });

    }
    AddActiveNewStatus(RandomStatus) {

        cy.get('span').contains('Add New Status').click();
        cy.get('span').contains('Select Parent Status').click();
        cy.get('li.pure-checkbox').contains('Active').parents('li').find('input[type="checkbox"]').check({ force: true });
        cy.get('input[formcontrolname="statusName"]').type(RandomStatus);
        cy.get('input[formcontrolname="statusColor"]')
            .then(($input) => {
                const nativeInput = $input[0];
                nativeInput.value = '#c25fe9ff';
                // dispatch proper Angular events
                nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
                nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
                cy.get('.btn').click()


            });

    }

    EditStatus(EditStatus) {

        cy.get('span').contains('Edit').first().click();
        cy.get('input[formcontrolname="statusName"]').clear().type(EditStatus);
        cy.get('.btn').click()


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
    SerchByName(StatusName) {
        cy.get('input[formcontrolname="statusName"]').should('be.visible').type(StatusName);
        cy.get('span').contains('Search').click()
    }
    SearchByActiveStatus() {

        cy.get('#mat-select-value-1').click()
        cy.get('#mat-option-5 > .mat-option-text').click();


        cy.get('span').contains('Search').click()

    }
    SearchByInActiveStatus() {
        cy.get('#mat-select-value-1').click()


        cy.get('#mat-option-6 > .mat-option-text').click()
        cy.get('span').contains('Search').click()

    }
    SetActiveStatus() {
        cy.get('.agent-status-button-inner').click();
        cy.get('button[mat-menu-item]').contains('updated Online').click();
        cy.wait(500)
    }
    SetInActiveStatus() {
        cy.get('.agent-status-button-inner').click();
        cy.get('button[mat-menu-item]').contains('Auto Offline').click();
    }
    DeleteStatus() {

        cy.get('span').contains('Delete').first().click();
        cy.get('#mat-dialog-0').should('be.visible');
        cy.get('.mat-dialog-actions > .btn-black').click()

    }



}




export default new AgentStatus();