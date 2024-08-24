import { expect, test } from "@playwright/test";
import { addQuiz } from "../fixtures/create";

test.beforeEach(async ({ page }) => {
  await page.goto("/create");
});

test.describe("Create Page", () => {
  test("Redirect from base url", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("create-room-button").click();

    await page.waitForURL(/create/);

    await expect(page).toHaveTitle(/Create/);
  });

  test("Create quiz", async ({ page }) => {
    await addQuiz(page, "Learn functional programming", false);
  });
});
