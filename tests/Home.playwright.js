const { test, expect } = require("@playwright/test");

const WEBSITE_URL = process.env.WEBSITE_URL || "https://akulsrivastava.com";

test.describe("Home", function () {
  test.beforeEach(async function ({ page }) {
    console.log(`Running Home tests on - ${WEBSITE_URL}`);
    await page.goto(WEBSITE_URL);
  });

  test("title", async function ({ page }) {
    const title = page.locator("header h1");
    await expect(title).toHaveText("Akul Srivastava");
  });
});
