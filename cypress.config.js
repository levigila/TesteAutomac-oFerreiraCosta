const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  e2e: {
    baseUrl: 'https://www.ferreiracosta.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    defaultCommandTimeout: 40000
  },
});
