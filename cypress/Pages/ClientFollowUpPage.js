import BasePage from "./BasePage";


class ClientFollowUp extends BasePage {

    visitClientFollowUp() {
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
        this.openSearch();
    }

    SerchByMobileNum(MobileNumber) {
        cy.get('#phone').type(MobileNumber);
        this.clickSearch();    
    }
     
    Clear() {
         this.clickClear();

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
        this.clickExport();
    }


}
export default new ClientFollowUp();
