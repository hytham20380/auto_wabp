const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qc-community.com/WABP_Axon/AdminTool",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    downloadsFolder: "cypress/Downloads/",
    experimentalSessionAndOrigin: true,

    retries: { 
      runMode: 3,  // retry failed tests 3 times in "cypress run"
      openMode: 0  // no retries in "cypress open"
    }
  },
});
