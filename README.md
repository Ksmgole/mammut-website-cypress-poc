# mammut-website-cypress-poc
This repo is a the proof-of-concept for the frontend testing of Mammut website using Cypress.

#Installation
- Clone the repository git clone https://github.com/Ksmgole/mammut-website-cypress-poc.git
- cd into the project directory
- npm install

#Running tests
- To run on testrunner npm run start
- To run headless npm run build

#Folder structure
- Fixtures: Test data are stored in fixture JSON files. 
- e2e: Test file is maintained in e2e folder.
- Support/command.js: This file contains reusable custom commands like login, addFeed, bookmarkFeed, unbookmarkFeed, submitComment.
- Cypress.config.js: Configuration values are stored in this file.
