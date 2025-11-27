class ClientsChatReport {
    visit() {
        //cy.visit('https://qc-community.com/WABP_QC1.7/AdminTool/pages/report/clientsChat');
        cy.contains('span.nav-link-text' , 'Clients Chat').click();
        

    }
    SearchByMobileNumber(MobileNumber) {
        cy.get('#phone').type(MobileNumber);
        cy.get('span').contains('Search').click()

    }
    SearchByClientName(CleintName) {
        cy.get('input[formcontrolname="clientName"]').type(CleintName);
        cy.get('span').contains('Search').click()

    }
    SearchByChannelType() {
        cy.get('#mat-select-value-1').click()
        cy.get('mat-option .mat-option-text').contains('WhatsApp').click();
        cy.get('span').contains('Search').click()


    }
    SerchByAgentName(AgentName) {
        cy.get('input[formcontrolname="agentName"]').type(AgentName);
        cy.get('span').contains('Search').click()



    }
    Clear() {
        cy.get('span').contains('Clear').click();

    }
    ExportFile() {
        cy.get('button[title="Export To Excel"]').click();

    }
    ViewChat() {
        cy.get('.btn-group-actions-list .btn').first().click();

    }
    ViewSupportHistory() {
     cy.get(':nth-child(1) > .py-2 > .btn-group-actions-list > :nth-child(2) > .btn > span').click();


    }
}
export default new ClientsChatReport();
