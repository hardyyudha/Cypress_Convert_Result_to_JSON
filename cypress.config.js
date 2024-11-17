const { defineConfig } = require("cypress");
const fs = require('fs')

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1024,
  failOnStatusCode: false,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        writeReport({fileName, report}){
          fs.writeFileSync(`cypress/results/${fileName}.json`, JSON.stringify(report, null, 2));
          return null
        },
        consoleLog(message){
          console.log(`Current test title: ${message}`)
          return null
        },
        log(message) {
          console.log(`Logging test: ${message}`)
          return null
        }
      })
    },
    baseUrl: 'https://saucedemo.com'
  },
});
