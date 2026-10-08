import {
  Page,
  Locator,
  expect
} from "@playwright/test";

export class UserManagementPage {
  private readonly page: Page;

  // Search section
  private readonly usernameSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;
  private readonly addButton: Locator;

  // Add User form
  private readonly userRoleDropdown: Locator;
  private readonly employeeNameInput: Locator;
  private readonly statusDropdown: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly saveButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Search section
    this.usernameSearchInput = page
      .locator('input[placeholder="Username"]')
      .first();

    this.searchButton = page.getByRole("button", {
      name: "Search"
    });

    this.resetButton = page.getByRole("button", {
      name: "Reset"
    });

    this.addButton = page.getByRole("button", {
      name: /Add/
    });

    // Add User form
    this.userRoleDropdown = page
      .locator(".oxd-select-text")
      .nth(0);

    this.employeeNameInput = page.getByPlaceholder(
      "Type for hints..."
    );

    this.statusDropdown = page
      .locator(".oxd-select-text")
      .nth(1);

    // IMPORTANT:
    // Find Username input using its label instead of nth().
    this.usernameInput = page
  .locator("input.oxd-input")
  .nth(1);

    this.passwordInput = page
      .locator('input[type="password"]')
      .nth(0);

    this.confirmPasswordInput = page
      .locator('input[type="password"]')
      .nth(1);

    this.saveButton = page.getByRole("button", {
      name: "Save"
    });

    this.cancelButton = page.getByRole("button", {
      name: "Cancel"
    });
  }

  async searchUser(username: string): Promise<void> {
  const usernameSearchInput = this.page
    .locator(".oxd-input-group")
    .filter({
      hasText: "Username"
    })
    .locator("input")
    .first();

  await usernameSearchInput.fill(username);

  await this.searchButton.click();
}

  async resetSearch(): Promise<void> {
    await this.resetButton.click();
  }

  async clickAddUser(): Promise<void> {
    await this.addButton.click();
  }

  async selectUserRole(role: string): Promise<void> {
    await this.userRoleDropdown.click();

    await this.page
      .getByText(role, {
        exact: true
      })
      .click();
  }

async enterEmployeeName(
  employeeName: string
): Promise<void> {
  await this.employeeNameInput.click();

  await this.employeeNameInput.fill("");

  await this.employeeNameInput.pressSequentially(
    employeeName,
    {
      delay: 100
    }
  );

  const option = this.page
    .locator(".oxd-autocomplete-option")
    .filter({
      hasText: employeeName
    })
    .first();

  await option.waitFor({
    state: "visible",
    timeout: 30000
  });

  await option.click();
}
  async selectStatus(
    status: string
  ): Promise<void> {

    await this.statusDropdown.click();

    await this.page
      .getByText(status, {
        exact: true
      })
      .click();
  }

  async enterUsername(
    username: string
  ): Promise<void> {

    await this.usernameInput.fill(
      username
    );
  }

  async enterPassword(
    password: string
  ): Promise<void> {

    await this.passwordInput.fill(
      password
    );
  }

  async enterConfirmPassword(
    password: string
  ): Promise<void> {

    await this.confirmPasswordInput.fill(
      password
    );
  }

  async saveUser(): Promise<void> {

    console.log("About to click Save");

    await this.saveButton.click();

    console.log("Save button clicked");
  }

  async cancelUserCreation(): Promise<void> {
    await this.cancelButton.click();
  }

  async isUserDisplayed(
    username: string
  ): Promise<boolean> {

    return await this.page
      .getByText(username, {
        exact: true
      })
      .isVisible();
  }
}