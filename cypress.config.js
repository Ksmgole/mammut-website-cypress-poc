const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '77kwtc',
  viewportWidth: 1440,
  viewportHeight: 900,

  e2e: {
    baseUrl: 'https://www.mammut.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


require('@applitools/eyes-cypress')(module);
