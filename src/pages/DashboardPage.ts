import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  private readonly page: Page;

  private readonly dashboardHeading: Locator;
  private readonly adminMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardHeading = page.getByRole("heading", {
      name: "Dashboard"
    });

    this.adminMenu = page.getByText("Admin", {
      exact: true
    });
  }

  async isDashboardDisplayed(): Promise<boolean> {
    return await this.dashboardHeading.isVisible();
  }

  async navigateToAdmin(): Promise<void> {
    await this.adminMenu.click();
  }
}