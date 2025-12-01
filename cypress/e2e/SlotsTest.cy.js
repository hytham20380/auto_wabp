import BasePage from "../Pages/BasePage";
import SlotsPage from "../Pages/SlotsPage";


describe('Slots Page Tests Using Fixtures', () => {
    BasePage.init(SlotsPage, 'SlotData');
it ('Should create a new slot successfully',function(){

     const clubs =this.SlotData.Clubs;
     const AgeGroup =this.SlotData.AgeGroup;

     const randomClub = Cypress._.sample(clubs);
     const randomAgeGroup = Cypress._.sample(AgeGroup);
     SlotsPage.CreateNewSlot(randomClub,randomAgeGroup);
     cy.get('.mat-simple-snack-bar-content').should('contain', 'Slot created successfully');



});

it ('Should Search By the club successfully ',function(){



});

it ('Should Search By the Age group successfully ',function(){



});

it ('Should Change the availability successfully ',function(){



});
it ('Should Export the datasuccessfully ',function(){



});

it ('Should Search By the club successfully ',function(){



});




})