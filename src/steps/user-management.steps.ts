import {
  Given,
  When,
  Then
} from "@cucumber/cucumber";

import { expect } from "@playwright/test";

import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { UserManagementPage } from "../pages/UserManagementPage";
import {
  generateUserTestData,
  UserTestData
} from "../utils/test-data";
import { environment } from "../config/environment";

let testUser: UserTestData;

Given(
  "I am logged into OrangeHRM as an administrator",
  { timeout: 30 * 1000 },
  async function (this: CustomWorld) {

    const loginPage = new LoginPage(this.page);

    await loginPage.navigate(environment.baseUrl);

    await loginPage.login(
      environment.username,
      environment.password
    );

    await expect(
      this.page.getByRole("heading", {
        name: "Dashboard"
      })
    ).toBeVisible();
  }
);

When(
  "I navigate to the Admin user management page",
  async function (this: CustomWorld) {

    const dashboardPage = new DashboardPage(this.page);

    await dashboardPage.navigateToAdmin();

    await expect(
      this.page.getByText("System Users", {
        exact: true
      })
    ).toBeVisible();
  }
);

When(
  "I create a new user",
  { timeout: 30 * 1000 },
  async function (this: CustomWorld) {

    testUser = generateUserTestData();

    const userManagementPage =
      new UserManagementPage(this.page);

    await userManagementPage.clickAddUser();

    await userManagementPage.selectUserRole(
      testUser.userRole
    );

    await userManagementPage.enterEmployeeName(
      testUser.employeeName
    );
    await this.page.screenshot({
  path: "screenshots/01-after-employee-name.png",
  fullPage: true
});

    await userManagementPage.selectStatus(
      testUser.status
    );
    await this.page.screenshot({
  path: "screenshots/02-after-status.png",
  fullPage: true
});

    await userManagementPage.enterUsername(
      testUser.username
    );
     await this.page.screenshot({
  path: "screenshots/03-before-save.png",
  fullPage: true
});

    await userManagementPage.enterPassword(
      testUser.password
    );

    await userManagementPage.enterConfirmPassword(
      testUser.password
    );
    await this.page.screenshot({
  path: "screenshots/04-before-save.png",
  fullPage: true
});

    await userManagementPage.saveUser();
  }
);

Then(
  "the new user should be created successfully",
  { timeout: 30 * 1000 },
  async function (this: CustomWorld) {

    const validationDetails = await this.page
      .locator(".oxd-input-field-error-message")
      .evaluateAll((errors) =>
        errors.map((error) => {
          const field = error.closest(".oxd-input-group");

          return {
            error: error.textContent?.trim(),
            field: field?.textContent?.trim()
          };
        })
      );

    console.log(
      "Validation details:",
      JSON.stringify(validationDetails, null, 2)
    );

    const validationErrors = validationDetails.map(
      (item) => item.error
    );

    expect(
      validationErrors,
      `OrangeHRM form validation errors: ${validationErrors.join(", ")}`
    ).toEqual([]);

    await expect(this.page).toHaveURL(
      /\/admin\/viewSystemUsers/
    );

    await expect(
      this.page.getByText("System Users", {
        exact: true
      })
    ).toBeVisible();
  }
);

When(
  "I search for the newly created user",
  async function (this: CustomWorld) {

    const userManagementPage =
      new UserManagementPage(this.page);

    await userManagementPage.searchUser(
      testUser.username
    );
  }
);

Then(
  "the newly created user should be displayed",
  async function (this: CustomWorld) {

    await expect(
      this.page.getByText(
        testUser.username,
        {
          exact: true
        }
      )
    ).toBeVisible();
  }
);

When(
  "I logout from OrangeHRM",
  async function (this: CustomWorld) {

    const userMenu = this.page.locator(
      ".oxd-userdropdown-tab"
    );

    await userMenu.click();

    await this.page.getByText(
      "Logout",
      { exact: true }
    ).click();
  }
);

Then(
  "I should be redirected to the login page",
  async function (this: CustomWorld) {

    await expect(
      this.page.getByRole("button", {
        name: "Login"
      })
    ).toBeVisible();
  }
);