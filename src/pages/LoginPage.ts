import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", {
      name: "Login"
    });
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(
    username: string,
    password: string
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }
}