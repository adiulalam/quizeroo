import { expect, test } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.describe("Home Page", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test("Goto base url", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("create-room-button").click();

    await page.waitForURL(/auth0.com/);

    await expect(page.getByLabel("Email address")).toBeEmpty();
    await expect(page.getByLabel("Password")).toBeEmpty();
  });
});
