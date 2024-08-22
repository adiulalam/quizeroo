import { expect, test } from "@playwright/test";

test.afterEach(async ({ page }) => {
  await page.goto("/create");
});

test.describe("Create Page", () => {
  test("Redirect from base url", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("create-room-button").click();

    await page.waitForURL(/create/);

    await expect(page).toHaveTitle(/Create/);
  });
});
