import BasePage from "./BasePage";


class SmsCampaignPage extends BasePage {


    visit() {

    cy.contains('span.nav-link-text', 'SMS Campaigns').click();

  }

  AddNewSmsCampaignInfoTab(CampaignName) {
    super.clickCreate();

    cy.get('span').contains('Select Channel').click();
    cy.contains('label', 'SMS').prev('input[type="checkbox"]').check({ force: true }); 
      // find the <label> that contains SMS // get the previous sibling checkbox    
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains('Onspot').click();
    cy.get('span').contains('Normal').click();
    cy.get('span').contains('Next').click();
    cy.scrollTo('top');

  }

ContactsTab(Mobilenumber) {

    cy.get('#phone').type(Mobilenumber);
    super.clickAddNew({ timeout: 5000 });
    cy.get('button').contains('Next').click({ force: true });

  }


  TemplateTab(TemplateName) {
    // 1️⃣ Click the "Select Template" to open the dropdown
    cy.get('span').contains('Select Template').click();
    // 2️⃣ Locate the real input that appears in the dropdown for searching
    // Check your app’s HTML to find the real input element inside the dropdow
    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input', { timeout: 5000 })
      .should('be.visible')
      .clear()
      .type(TemplateName, { force: true });
    // 3️⃣ Wait for the search results and click the matching checkbox
    cy.contains('li', TemplateName, { timeout: 5000 })
      .find('input[type="checkbox"]')
      .check({ force: true });
    // 4️⃣ Click the "+ Fill" button
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();
    // 5️⃣ Click "Fill"
    cy.contains('button', 'Fill').click({ force: true });



    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    //cy.get('#cdk-step-label-0-2').click();
    //cy.get('#cdk-step-label-0-3').click();

    super.clickSave({ timeout: 5000 });

  }

customGroupCamp(CustomOnspot, TemplateName) {
    super.clickCreate({ timeout: 5000 });

    cy.get('span').contains('Select Channel').click();
    cy.contains('label', 'SMS').prev('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CustomOnspot);
    cy.get('span').contains('Onspot').click();
    cy.get('span').contains('Customized').click();
    cy.get('span').contains('Next').click();
    //cy.scrollTo('top');
    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    cy.get('#groupsDD > .cuppa-dropdown > .selected-list > .c-btn').click()
    cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1)').click()

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    this.TemplateTab(TemplateName);


    cy.wait(1000); // زيادة مهلة بسيطة قبل الضغط
    cy.get('.mat-simple-snack-bar-content').should('exist').click({ force: true });

    cy.wait(500)

}

 normalGroupCamp(NormalSchedual, TemplateName) {
    super.clickCreate({ timeout: 5000 });

    cy.get('span').contains('Select Channel').click();
    cy.contains('label', 'SMS').prev('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(NormalSchedual);
    cy.get('span').contains('Onspot').click();
    cy.get('span').contains('Normal').click();
    cy.get('span').contains('Next').click();
    cy.scrollTo('top');
    // افتح الـ Groups step
cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count')
  .should('be.visible')
  .click();

cy.wait(500);

// اضغط على الزر اللي بيفتح الـ dropdown
cy.get('#groupsDD .c-btn').should('be.visible').click({ force: true });

// انتظر لحد القائمة ما تظهر فعلاً
cy.get('.dropdown-list.animated.fadeIn.tagToBody', { timeout: 10000 }).should('be.visible');

// اختار أول عنصر من القائمة
cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1) > label').first().should('be.visible').click({ force: true });
    cy.wait(500)
    cy.get('#cdk-step-content-0-1 > .card-head-btns-add-campain-wrapper > .mat-stepper-next').click();
    this.TemplateTab(TemplateName);

    cy.wait(1500);
 // زيادة مهلة بسيطة قبل الضغط
    cy.get('.mat-simple-snack-bar-content').should('exist');

    cy.wait(500)
 }
ScheduleCampaignInfoTab(CampaignName) {
    super.clickCreate({ timeout: 5000 });
    cy.get('span').contains('Select Channel').click();
    cy.contains('label', 'SMS').prev('input[type="checkbox"]').check({ force: true });
    cy.get('input[data-placeholder="Name your campaign"]').should('be.visible').type(CampaignName);
    cy.get('span').contains('Scheduled').click();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2); // Adds 2 days
    futureDate.setHours(10); // Sets hour to 10 AM
    futureDate.setMinutes(0); // Sets minutes to 00

    const day = futureDate.getDate();
    const hour = futureDate.getHours();
    const minute = futureDate.getMinutes();

    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12; // convert 24h → 12h

    // Open date picker
    cy.get('input[formcontrolname="sendingDateTime"]').click();

    // Pick the day (navigate month if needed)
    cy.get('body').then(($body) => {
      if ($body.find(`.mat-calendar-body-cell-content:contains(${day})`).length === 0) {
        cy.get('.mat-calendar-next-button').click();
      }

      cy.get('.mat-calendar-body-cell-content')
        .contains(new RegExp(`^\\s*${day}\\s*$`))
        .click();
    });

    // Fill the hour
    cy.get('input[formcontrolname="hour"]')
      .clear()
      .type(displayHour.toString().padStart(2, '0'));

    // Fill the minutes
    cy.get('input[formcontrolname="minute"]')
      .clear()
      .type(minute.toString().padStart(2, '0'));

    // Set AM/PM if needed
    cy.get('button')
      .contains(/AM|PM/)
      .then(($btn) => {
        if (!$btn.text().includes(ampm)) {
          cy.wrap($btn).click();
        }
      });


    // Step 7: Confirm the selection
    cy.get('button mat-icon').contains('done').parents('button').click({ force: true });

    cy.get('span').contains('Normal').click();
    cy.get('span').contains('Next').click();
    cy.scrollTo('top');
  }


 openSearch() {
    super.openSearch();
  
}

SearchByCampaignName(CampaignName) {
    cy.get('input[formcontrolname="campaignName"]').type(CampaignName)
    super.clickSearch();

  }

  SearchBySendingStatus() {
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains('Sent').click();

    super.clickSearch();
  }
SearchByOnspotCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Onspot').click();
    super.clickSearch();
  }
  SearchByCustomCampaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Custom').click();
    super.clickSearch();
  }
SearchByScheduledCmapaign() {
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Scheduled').click();
    super.clickSearch();
  }

  Clearbutton() {
    
    cy.get('input[formcontrolname="campaignName"]').type('Test SMS Campaign 779');
    cy.get('#mat-select-value-1').click();
    cy.get('.mat-option-text').contains('Sent').click();
    cy.get('#mat-select-value-3').click();
    cy.get('.mat-option-text').contains('Onspot').click();
    super.clickClear();
  }
DuplicateWithoutChanging() {

    cy.get('span').contains('Duplicate').click();
    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newValue = `Campaign-Rand-${randomSuffix}`;
    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')
      .trigger('input')
      .type(newValue, { force: true });
    cy.get('span').contains('Onspot').click();


    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

   super.clickSave({ timeout: 5000 });


 
 }

OnspotToScheduled() {


    cy.get('span').contains('Duplicate').click();

    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`;
    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')
      .trigger('input')
      .type(newValue, { force: true });

    cy.get('span').contains('Scheduled').click();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2); // Adds 2 days to the current date
    futureDate.setHours(10); // Sets the hour to 10 AM
    futureDate.setMinutes(0); // Sets the minutes to 00

    const day = futureDate.getDate(); // e.g., 12
    const hour = futureDate.getHours(); // e.g., 10
    const minute = futureDate.getMinutes(); // e.g., 0
    const ampm = hour >= 12 ? 'PM' : 'AM'; // determines AM/PM
    const displayHour = hour % 12 || 12; // convert to 12-hour format (e.g., 13 -> 1)
    cy.get('input[formcontrolname="sendingDateTime"]').click();

    // Step 3: Select the day
    cy.get('.mat-calendar-body-cell-content')
      .contains(new RegExp(`^\\s*${day}\\s*$`))
      .should('be.visible')
      .click();
    // Step 4: Fill in hour
    cy.get('input[formcontrolname="hour"]')
      .clear()
      .type(displayHour.toString().padStart(2, '0'));

    // Step 5: Fill in minutes
    cy.get('input[formcontrolname="minute"]')
      .clear()
      .type(minute.toString().padStart(2, '0'));

    // Step 6: Set AM/PM if needed
    cy.get('button.mat-stroked-button').then(($btn) => {
      if (!$btn.text().includes(ampm)) {
        cy.wrap($btn).click(); // toggle to correct AM/PM
      }
    });
    // Step 7: Confirm the selection
    cy.get('button mat-icon').contains('done').parents('button').click({ force: true });

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    super.clickSave({ timeout: 5000 });


 
  }

  ScheduledToOnspot() {


    cy.get('span').contains('Duplicate').click();

    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`;

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')
      .trigger('input')
      .type(newValue, { force: true });

    cy.get('span').contains('Onspot').click();


    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    super.clickSave({ timeout: 5000 });


  }
CustomToNormal(Mobilenumber) {


    cy.get('span').contains('Duplicate').click();

    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`;
    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')
      .trigger('input')
      .type(newValue, { force: true });


    cy.get('span').contains('Normal').click();



    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)


    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    this.ContactsTab(Mobilenumber)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    super.clickSave({ timeout: 5000 });


  }
  NormalToCutom() {

    cy.get('span').contains('Duplicate').click();

    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"
    const newValue = `Campaign-Rand-${randomSuffix}`;

    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })
      .invoke('val', '')
      .trigger('input')
      .type(newValue, { force: true });


    cy.get('span').contains('Customized').click();

    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)


    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)
    cy.get('#groupsDD > .cuppa-dropdown > .selected-list > .c-btn').click()
    cy.get('#groupsDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > :nth-child(1)').click()

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    super.clickSave({ timeout: 5000 });


  }
DuplicateChangeTemp(TemplateName) {
    cy.get('span').contains('Duplicate').click();


    cy.get('mat-dialog-container').should('be.visible')

    cy.contains('button', 'Yes').click()
    cy.wait(500)
    // Step: Generate random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "A3B9"

    const newValue = `Campaign-Rand-${randomSuffix}`


    // Step: Set new campaign name (overwrite completely)
    cy.get('input[formcontrolname="name"]')
      .click({ force: true })

      .invoke('val', '')
      .trigger('input')
      .type(newValue, { force: true });



    cy.get('#cdk-step-label-0-0 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-1 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)

    cy.get('#cdk-step-label-0-2 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()
    cy.wait(500)


    cy.get('#templatesDD .c-btn')
      .should('exist')
      .then($btn => {
        $btn[0].click(); // native DOM click
      });

    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > .list-filter > .c-input').should('be.visible').clear().type(TemplateName).click();
    // 3️⃣ Wait for the search results and click the matching checkbox
    cy.get('#templatesDD > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 160px;"] > .lazyContainer > .pure-checkbox').click()
    // 4️⃣ Click the "+ Fill" button
    cy.get('.global-card-form-input > .global-card-form-input-wrapper > .row > .col-md-3 > .btn').click();
    // 5️⃣ Click "Fill"
    cy.contains('button', 'Fill').click({ force: true });
    cy.scrollTo('bottom'); // Scrolls to bottom of the page



    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-title').click()


    cy.get('#cdk-step-label-0-3 > .mat-step-label > .mat-step-text-label > .d-flex > .step-count').click()

    cy.wait(500)

    super.clickSave({ timeout: 5000 });



  }

ExportSmsCampaign() {
  cy.contains('span', 'View').click();     
  BasePage.Export();
}

}
export default new SmsCampaignPage();