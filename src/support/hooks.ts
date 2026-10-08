import {
  Before,
  After,
  Status,
  setDefaultTimeout
} from "@cucumber/cucumber";

import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

import { CustomWorld } from "./world";

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({
    headless: true
  });

  this.context = await this.browser.newContext();

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {

  if (scenario.result?.status === Status.FAILED) {

    // Create screenshots folder if it doesn't exist
    const screenshotsDir = path.join(
      process.cwd(),
      "screenshots"
    );

    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, {
        recursive: true
      });
    }

    // Create a unique screenshot name
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    const screenshotPath = path.join(
      screenshotsDir,
      `failed-${timestamp}.png`
    );

    // Save screenshot to project
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    // Attach screenshot to Cucumber report
    const screenshot = await this.page.screenshot({
      type: "png",
      fullPage: true
    });

    await this.attach(
      screenshot,
      "image/png"
    );

    console.log(
      `Screenshot saved: ${screenshotPath}`
    );
  }

  await this.page.close();
  await this.context.close();
  await this.browser.close();
});