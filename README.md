# Mammut-website-cypress-poc
This repo is a  proof-of-concept for the frontend testing of Mammut website using Cypress which includes the test for
* Translation as per the locale
* Login form flow and invalid validation
* UI testing on different screen sizes
* Add to cart flow from API and UI
* UI validation with CSS and class
* Visual testing for Mammut landing page

## Installation
- Clone the repository git clone https://github.com/Ksmgole/mammut-website-cypress-poc.git
- cd into the project directory
- run `npm install`

## Folder structure
- Fixtures: Test data are stored in fixture JSON files. 
- e2e: Test file is maintained in e2e folder.
- Support/command.js: This file contains reusable custom commands like signUp
- Cypress.config.js: Configuration values are stored in this file.

## Running tests
- To run on testrunner browser `npm run start`
- To run headless `npm run build`
