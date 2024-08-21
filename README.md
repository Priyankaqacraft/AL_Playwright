## Setup

Run the tests locally.

1. Install packages.

   ```bash
   $ npm install --force
   ```
   
1. Run the tests.

   ```bash
   $ # Run the tests in headless mode.
   $ npm test - This will run all Test file from Test folder
   $ # Run the tests visually on web browser.
   $ npm testOnly 'path to test file' - This will run specific test file
   

## Notes

Folder Structure
1. [utils]

   This folder contains common functionality for various operations needed in the tests. It includes four different JavaScript files, each with its specific importance:

   a. [login.js]: Handles the login functionality across tests.

   b. [config.js]: Manages credentials securely and provides functions to retrieve them when needed.

   c. [screenshothelper.js]: Provides functionality to take screenshots during tests, useful for debugging and reporting.

   d. [mailslurphelper.js]: Integrates with MailSlurp to handle email interactions during tests, such as receiving and verifying emails.

2. [pages]

   This folder includes all the JavaScript files for different page objects, each containing functions and their implementations for interacting with the respective web pages.

   1. [commonpage.js]: Contains common functions used across multiple page objects. These include:

      a. getAttribute(): Retrieves the attribute value of an element.

      b. elementExist(): Checks if an element exists on the page.

      c. elementVisible(): Checks if an element is visible on the page.

      d. getText(): Retrieves the text content of an element.
      
      e. createRandomNumber(): Generates a random number for use in tests. , etc

3. [tests]

   This folder contains all the test code for verifying and validating the functionality of each web page across the application. Each test file corresponds to a specific web page or feature and includes various test cases to ensure the expected behavior of the application.