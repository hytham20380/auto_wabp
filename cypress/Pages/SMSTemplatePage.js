class SMSTemplate {

    visitTemplate(){
        cy.get('#cdk-accordion-child-5 > .mat-expansion-panel-body > .subnav-dropdown > :nth-child(1) > .subnav-link').click();
    }

    AddNewTemplate (Name,Body){
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

    SearchByName(Name){
        cy.get('input[formcontrolname="templateName"]').type(Name);
        cy.get('span').contains('Search ').click();
        

    }

    SerchByAvailablity(){
        cy.get(':nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').click();
        cy.get('span').contains(' Yes ').click();
        cy.get('span').contains('Search ').click();


    }
    SerchByChannel(){
        cy.get(':nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.get('#mat-option-8 > .mat-option-text').click();
        cy.get('span').contains('Search ').click();


    
    }
    Clear(){
         
         cy.get('span').contains('Clear').click();


    }

    ChangeToNotAvailable(){
        cy.get('#mat-slide-toggle-45 > .mat-slide-toggle-label > .mat-slide-toggle-bar > .mat-slide-toggle-thumb-container > .mat-slide-toggle-thumb').click()
        //cy.get('#mat-dialog-0').should('be.visible')
        cy.get('.mat-dialog-actions > .btn-black').click();
        //cy.get('#mat-dialog-0').should('be.visible').click();
 


    }
    ChengeToAvailable(){
       cy.get('#mat-slide-toggle-45 > .mat-slide-toggle-label > .mat-slide-toggle-bar > .mat-slide-toggle-thumb-container > .mat-slide-toggle-thumb').click()
        //cy.get('#mat-dialog-0').should('be.visible')
        cy.get('.mat-dialog-actions > .btn-black').click();
        //cy.get('#mat-dialog-0').should('be.visible').click();

    }
    ExportTemplate(){

    }
    
}
export default new SMSTemplate();