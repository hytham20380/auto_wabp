import LoginPage from '../Pages/LoginPage';
import ClientFollowUpPage from '../Pages/ClientFollowUpPage';

describe('Client Follow-Up Page Tests Using Fixtures', () => {

    beforeEach(function () {
        // Load fixtures first
        cy.fixture('LoginData').as('LoginData');


        // Perform login and wait for successful navigation
        cy.get('@LoginData').then((loginData) => {
            LoginPage.visit();
            LoginPage.login(loginData.admin.email, loginData.admin.password);

            // Wait for successful login (adjust the selector to match your app)
            cy.url().should('not.include', '/auth/login');
        });


        ClientFollowUpPage.visitClientFollowUp();
        cy.url().should('include', '/pages/clientFollowUps'); // ✅ expected path
        cy.fixture('ClientFollowUpData').then((data) => {
            cy.wrap(data).as('ClientFollowUpData'); // 🔹 Store fixture data globally
        });

    });

    it('Should Sent Message Successfully With Valid Data ', function () {
        const randomMobile = this.ClientFollowUpData.MobileNumber[
            Math.floor(Math.random() * this.ClientFollowUpData.MobileNumber.length)
        ];
        const Template = this.ClientFollowUpData.Template
        const Channel = this.ClientFollowUpData.ChannelName
        ClientFollowUpPage.SendMessage(Channel, Template, randomMobile);
        cy.get('.mat-simple-snack-bar-content').should('contain', 'Message sent successfully');

    })

    it('Check the validations when send message with empty data  ', function () {
        ClientFollowUpPage.ValidationMessages()
        cy.contains('span', 'Please Select').should('be.visible');


    })

    it('Check the validation on the mobile number when enter invalid mobile number  ', function () {
        const Template = this.ClientFollowUpData.Template
        const Channel = this.ClientFollowUpData.ChannelName
        const invalidNum = this.ClientFollowUpData.InvalidMobileNumber

        ClientFollowUpPage.MobileValidation(Channel, Template, invalidNum)
        cy.contains('span', 'Mobile Number is Invalid').should('be.visible');


    })
    it('Should return the related data when search by valid mobile number  ', function () {
        //ClientFollowUpPage.openSearch()
        ClientFollowUpPage.SerchByMobileNum(this.ClientFollowUpData.SearchNum)
        cy.get('tbody > :nth-child(1) > .cdk-column-mobileNumber').should('contain', this.ClientFollowUpData.SearchNum);


    })
    it('Should clear the search successfully  ', function () {
        ClientFollowUpPage.SerchByMobileNum(this.ClientFollowUpData.SearchNum)
        ClientFollowUpPage.Clear();
        cy.get('tbody > :nth-child(1) > .cdk-column-mobileNumber').should('contain', ' ');



    })
    it('Export the data in excel file successfuly  ', function () {
        ClientFollowUpPage.Export()

        // Wait for the file to be downloaded
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const downloadedFilename = `Client Follow Ups_${today}.xlsx`;

        cy.readFile(`cypress/downloads/${downloadedFilename}`, { timeout: 15000 }).should('exist')




    })









});