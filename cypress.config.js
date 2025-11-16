const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
        baseUrl: "https://qc-community.com/WABP_QC1.8/admintool", 
        
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    downloadsFolder: "cypress/Downloads/" ,// ✅ specify your downloads directory
    experimentalSessionAndOrigin: true
  },
});
