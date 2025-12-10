# Playwright Project with Allure Reporting

This project contains automated end-to-end tests built using **Playwright**.  
It includes **Allure HTML reporting** for the full test suite as well as three separate test areas:

- Bookstore listing
- Book details & cart operations
- Login functionality

All reporters are already configured in `playwright.config` via `allure-playwright`.  
Each test group has its own execution and report generation commands.

## Run Tests & Reports

### Running Tests
- Run all tests
npm run test:all

- Run only Bookstore tests
npm run test:bookstore

- Run only Book Details & Cart tests
npm run test:book

- Run only Login tests
npm run test:login

### Generate Allure Reports
- Generate & open report for the entire test suite
npm run report:all

- Generate & open Bookstore report
npm run report:bookstore

- Generate & open Book Details / Cart report
npm run report:book

- Generate & open Login report
npm run report:login

## Report Locations

Each report is generated under:

allure-report/
  all/
  bookstore/
  book/
  login/