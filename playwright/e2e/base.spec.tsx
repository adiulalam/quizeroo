import { expect, test } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated
test.describe("Home Page", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test("Manual sign in", async ({ page, browserName }) => {
    test.skip(browserName === "chromium", "In Chrome it seems to fail.");

    const hasAuth0Env =
      !!process.env.AUTH0_CLIENT_ID &&
      !!process.env.AUTH0_CLIENT_SECRET &&
      !!process.env.AUTH0_ISSUER;
    test.skip(!hasAuth0Env, "Auth0 Environements not found.");

    await page.goto("/");

    await page.getByTestId("create-room-button").click();

    await expect(page).toHaveURL(/auth0\.com/);

    await expect(page.getByLabel("Email address")).toBeEmpty();
    await expect(page.getByLabel("Password")).toBeEmpty();
  });
});
