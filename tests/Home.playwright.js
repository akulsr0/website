const { test, expect } = require("@playwright/test");

test.describe("Home", function () {
  test.beforeEach(async function ({ page }) {
    await page.goto("https://akulsrivastava.com/");
  });

  test("title", async function ({ page }) {
    const title = page.locator("header h1");
    await expect(title).toHaveText("Akul Srivastava");
  });
});
