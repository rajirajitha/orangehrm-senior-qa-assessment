# OrangeHRM Senior QA Automation Assessment

## Project Overview

This project contains an automated BDD test solution for the OrangeHRM Demo application.

The automation focuses on the Admin User Management workflow and demonstrates:

- BDD-style test scenarios using Cucumber
- UI automation using Playwright
- TypeScript implementation
- Page Object Model (POM)
- Dynamic test data generation
- Smoke and Regression test classification
- Validation and post-action verification
- Failure screenshots
- Cucumber JSON and HTML reporting

The implementation is designed with maintainability, readability, and release confidence in mind.

---

## Application Under Test

**Application:** OrangeHRM Demo

**URL:**  
https://opensource-demo.orangehrmlive.com/

The test uses the provided administrator credentials through environment variables.

> Credentials are intentionally kept outside the source code using a `.env` file.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Programming language |
| Playwright | Browser automation |
| Cucumber | BDD test framework |
| Gherkin | Feature/scenario definition |
| Node.js | Runtime |
| ts-node | TypeScript execution |
| dotenv | Environment configuration |
| multiple-cucumber-html-reporter | HTML test reporting |

---

## Framework Architecture

The framework follows a Page Object Model structure.

```text
orangehrm-senior-qa-assessment/
│
├── features/
│   └── user-management.feature
│
├── src/
│   ├── config/
│   │   └── environment.ts
│   │
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   └── UserManagementPage.ts
│   │
│   ├── steps/
│   │   └── user-management.steps.ts
│   │
│   ├── support/
│   │   ├── hooks.ts
│   │   └── world.ts
│   │
│   └── utils/
│       └── test-data.ts
│
├── reports/
├── screenshots/
│
├── .env
├── .gitignore
├── cucumber.js
├── generate-report.js
├── update-report.js
├── .multiple-cucumber-html-reporter.json
├── package.json
├── package-lock.json
└── tsconfig.json
```

Cucumber supports project-level configuration through `cucumber.js`, as used in this project. It also supports tag expressions for filtering scenarios.

---

## BDD Scenario

The implemented scenario covers the following end-to-end workflow:

```gherkin
Feature: Admin User Management

  As an administrator
  I want to manage users in OrangeHRM
  So that I can maintain valid user accounts

  @smoke @regression
  Scenario: Successfully create a new user
    Given I am logged into OrangeHRM as an administrator
    When I navigate to the Admin user management page
    And I create a new user
    Then the new user should be created successfully
    When I search for the newly created user
    Then the newly created user should be displayed
    When I logout from OrangeHRM
    Then I should be redirected to the login page
```

---

## Test Coverage

The scenario validates:

1. Administrator login
2. Navigation to Admin User Management
3. Creation of a new user
4. User role selection
5. Employee selection
6. User status selection
7. Username and password creation
8. Save operation
9. Validation of successful creation
10. Search for the newly created user
11. Verification that the user is displayed
12. Logout
13. Verification of redirection to the login page

---

## Test Classification

### Smoke

The scenario is classified as **Smoke** because it validates a critical end-to-end Admin workflow.

The test confirms that an administrator can:

- Access the application
- Access User Management
- Create a user
- Search for the created user
- Logout successfully

A failure in this workflow could significantly reduce confidence in the application's basic usability.

### Regression

The scenario is also classified as **Regression** because User Management is an existing application capability that should continue to work after application changes.

The regression test verifies that the complete user-management flow remains functional.

### SIT

**SIT is not directly applicable to the current implementation.**

The implemented workflow is UI-focused and does not require validation of a system-to-system integration or external service interaction.

If API or external integrations were part of the application scope, additional SIT scenarios could be introduced.

---

## Installation

### Prerequisites

Install:

- Node.js
- npm
- Git

Verify the installation:

```powershell
node --version
npm --version
```

### Install dependencies

From the project root:

```powershell
npm install
```

---

## Environment Configuration

Create a `.env` file in the project root:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com/
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123
```

The `.env` file is excluded from Git using `.gitignore`.

This prevents credentials from being committed to the repository.

---

## Running the Tests

### Run all tests

```powershell
npm test
```

### Run Smoke tests

```powershell
npm run test:smoke
```

### Run Regression tests

```powershell
npm run test:regression
```

Cucumber supports filtering scenarios using tag expressions, which is why the project uses `@smoke` and `@regression` tags.

---

## Test Results

The current implementation has been validated with:

### Smoke

```text
1 scenario passed
10 steps passed
```

### Regression

```text
1 scenario passed
10 steps passed
```

---

## Reporting

The project generates a Cucumber JSON report and an HTML report.

Generate the HTML report using:

```powershell
npm run test:report
```

The report is generated under:

```text
reports/html/index.html
**Test Execution Report:** `reports/html/index.html`
```

Open the report:

```powershell
start .\reports\html\index.html
```

The project uses `multiple-cucumber-html-reporter` with the `mchr` CLI. The reporter documentation identifies `mchr` as the recommended CLI approach for current versions.

The report contains execution information, scenario results, step results, duration, and custom execution information.

---

## Failure Handling

When a Cucumber scenario fails, the framework captures a screenshot of the current browser page.

Screenshots are attached to the Cucumber result and can also be stored under the project's screenshot output location.

This provides visual evidence for debugging failed UI tests.

---

## Test Data Strategy

The framework generates a unique username using the current timestamp.

Example:

```text
qauser<timestamp>
```

This reduces the possibility of username conflicts when the test is executed repeatedly.

The employee name and other required values are maintained in the test-data utility.

---

## Page Object Model

The application is separated into reusable page objects:

### LoginPage

Responsible for:

- Navigating to OrangeHRM
- Entering username
- Entering password
- Clicking Login

### DashboardPage

Responsible for:

- Verifying the Dashboard
- Navigating to Admin

### UserManagementPage

Responsible for:

- Searching users
- Adding users
- Selecting user roles
- Selecting employees
- Selecting status
- Entering username/password
- Saving users
- Verifying users

This separation keeps locators and page interactions outside the step definitions and improves maintainability.

---

## Hooks and Browser Management

Cucumber hooks are used to manage the Playwright browser lifecycle.

Before each scenario:

- Chromium is launched
- A browser context is created
- A new page is created

After each scenario:

- Failure screenshots are captured when required
- The page is closed
- The browser context is closed
- The browser is closed

This provides scenario-level browser isolation.

---

## QA / Automation Approach

The automation approach was designed around the following principles:

### 1. Business-focused coverage

The automation prioritizes a complete business-critical Admin workflow rather than creating a large number of low-value tests.

### 2. Maintainability

Page Object Model is used to centralize locators and UI interactions.

### 3. Reusability

Common operations such as login, navigation, user creation, searching, and logout are implemented as reusable methods.

### 4. Stable test data

Dynamic usernames are generated to reduce duplicate-user failures.

### 5. Clear validation

The test validates both:

- successful user creation
- visibility of the newly created user after searching

### 6. Failure diagnostics

Screenshots are captured when scenarios fail.

### 7. Reporting

Cucumber JSON and HTML reporting provide visibility into test execution.

---

## Assumptions

- The OrangeHRM Demo application is available during test execution.
- The provided administrator credentials are valid.
- The required employee data exists in the test environment.
- The application UI and relevant locators remain compatible with the implemented automation.
- The test is intended for the provided OrangeHRM Demo environment.

---

## Limitations

- The current implementation focuses on the Admin User Management UI workflow.
- API testing is not included.
- Cross-browser execution is not currently configured.
- SIT coverage is not included because no external integration workflow is part of the implemented scope.
- The current suite contains one primary end-to-end scenario.
- Parallel execution is not currently enabled.
- The demo application's test data may change over time, which can affect employee autocomplete behavior.

---

## Suggested Improvements

For a production-scale automation framework, the following improvements could be added:

### Test Coverage

Add scenarios for:

- Invalid login
- Required-field validation
- Duplicate username validation
- Invalid password confirmation
- User update
- User deletion
- Search with different filters
- Reset search
- Disabled user validation

### Cross-browser Testing

Run the suite against:

- Chromium
- Firefox
- WebKit

### CI/CD Integration

Integrate the automation suite with Jenkins, GitHub Actions, or another CI/CD platform.

A typical pipeline could execute:

```text
Checkout
   ↓
Install dependencies
   ↓
Run Smoke tests
   ↓
Generate report
   ↓
Publish report
   ↓
Fail pipeline if critical tests fail
```

### Parallel Execution

As the suite grows, scenarios can be distributed across workers to reduce regression execution time.

### Environment Management

Support separate configuration for:

```text
DEV
QA
UAT
```

using environment-specific configuration.

### Better Test Data Management

For larger suites, test data could be managed through:

- API setup
- Database setup
- Dedicated test-data services
- Controlled fixtures

### API + UI Hybrid Testing

Where APIs are available, API calls can be used for test-data setup and cleanup, while UI automation focuses on validating the user-facing behavior.

### Enhanced Reporting

Future improvements could include:

- CI build information
- Environment information
- Browser matrix
- Historical trends
- Failure categorization
- Notifications

---

## Definition of Done

The current assessment implementation is considered complete when:

- [x] BDD feature is implemented
- [x] Login workflow is automated
- [x] Admin navigation is automated
- [x] User creation is automated
- [x] User creation is validated
- [x] User search is validated
- [x] Logout is validated
- [x] Smoke classification is implemented
- [x] Regression classification is implemented
- [x] Failure screenshots are supported
- [x] Cucumber JSON reporting is configured
- [x] HTML reporting is configured
- [x] Environment credentials are externalized
- [x] README documentation is provided

---

## Author

**Rajitha Chandrasekhar**

**Role:** Senior QA Engineer Assessment

**Automation Stack:** Playwright + TypeScript + Cucumber BDD