const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const WEBSITE_URL = process.env.WEBSITE_URL || "https://akulsrivastava.com";

test.describe("DevTips - Web", function () {
  const categoriesPath = path.join("content/dev-tips");
  const categories = fs.readdirSync(categoriesPath);

  test.beforeEach(async function ({ page }) {
    console.log(`Running DevTips test on - ${WEBSITE_URL}`);
    await page.goto(`${WEBSITE_URL}/dev-tips/`);
  });

  test("categories should be visible", async function ({ page }) {
    for (let category of categories) {
      await expect(page.locator(`text=${category}`).first()).toBeVisible();
    }
  });

  test("every category should have tips inside it", async function ({ page }) {
    for (let category of categories) {
      await page.locator(`text=${category}`).first().click();
      const tips = await page.locator("#content > ol > li").count();
      expect(tips).toBeGreaterThan(0);
      await page.goBack();
    }
  });

  test("tagline should be visible", async function ({ page }) {
    await expect(page.locator("#content blockquote").first()).toBeVisible();
  });

  test("search should not be focussed", async function ({ page }) {
    await expect(
      page.locator("input[placeholder='Search']").first()
    ).not.toBeFocused();
  });

  test("date should be visible", async function ({ page }) {
    const dates = await page
      .locator("#content > div:nth-child(3) > div > span")
      .allInnerTexts();
    for (const date of new Set(dates)) {
      const dateLoc = page.locator(`text=${date}`);
      const dateLocCount = await dateLoc.count();
      if (dateLocCount > 1) {
        for (let i = 0; i < dateLocCount; i++) {
          await expect(dateLoc.nth(i)).toBeVisible();
        }
      } else {
        await expect(dateLoc).toBeVisible();
      }
    }
  });
});
