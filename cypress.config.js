const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qc-community.com/WABP_QC1.9/AdminTool",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    downloadsFolder: "cypress/Downloads/",

    retries: {
      runMode: 3,  // retry failed tests 3 times in "cypress run"
      openMode: 0  // no retries in "cypress open" (changed from 3)
    },

    // Timeout configurations
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,

    // Viewport configuration (consistent across environments)
    viewportWidth: 1920,
    viewportHeight: 1080,

    // Video and screenshot settings for debugging CI failures
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Wait for animations and transitions
    waitForAnimations: true,
    animationDistanceThreshold: 5,
    
    // Scrolling behavior
    scrollBehavior: 'center', // 'top', 'bottom', 'center', 'nearest', false

    // Test isolation
    testIsolation: true,

    // Experimental features (optional but helpful)
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 10,

    // Browser launch options
    chromeWebSecurity: false, // if you need to test cross-origin
    
    // Slow down commands (helpful for CI debugging)
    // execTimeout: 60000,
    // taskTimeout: 60000,
  },

  // Environment variables
  env: {
    // Add any environment-specific variables
  },

  // Component testing config (if needed)
  component: {
    devServer: {
      framework: "react", // or "vue", "angular", etc.
      bundler: "vite", // or "webpack"
    },
  },
});