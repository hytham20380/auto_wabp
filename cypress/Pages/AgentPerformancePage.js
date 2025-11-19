class AgentPerformance {
 //Visit The Page
visitAgentPerformance () 

{
    cy.contains('.nav-link-text', 'Agent Performance').click();
}
//______________________________________________________Elements_________________________________________________________________
elements = {
    agentNameInput: () => cy.get('input[placeholder="Agent Name"]'),
    dateFromInput: () => cy.get('input[placeholder="Assigned Date From"]'),
    dateToInput: () => cy.get('input[placeholder="Assigned Date To"]'),
    searchButton: () => cy.contains('button', 'Search'),
    clearButton: () => cy.contains('Clear'),
    exportButton: () => cy.get('[data-testid="export-btn"], button[aria-label="download"]'),



    // Table
    tableRows: () => cy.get('table tbody tr'),
    tableCell: (rowIndex, colIndex) => 
      cy.get(`table tbody tr:nth-child(${rowIndex}) td:nth-child(${colIndex})`)
}

//______________________________________________________Methods_________________________________________________________________

searchByName(name) {
    this.elements.agentNameInput().clear().type(name);
    this.elements.searchButton().click();
  }

  filterByDate(from, to) {
    const selectDate = (input, dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        // 1️⃣ Open the calendar
        input.click();

        // 2️⃣ Navigate to the correct month and year (adjust selectors for your calendar)
        cy.get('.datepicker__month-select').select(month);
        cy.get('.datepicker__year-select').select(year.toString());

        // 3️⃣ Click the day
        cy.get('.datepicker__day').contains(day).click();
    };

    selectDate(this.elements.dateFromInput(), from);
    selectDate(this.elements.dateToInput(), to);

    // 4️⃣ Click search
    this.elements.searchButton().click();
}

  clearFilters() {
    this.elements.clearButton().click();
  }


}

export default new AgentPerformance();