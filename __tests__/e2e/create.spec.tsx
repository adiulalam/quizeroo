import { expect, test } from "@playwright/test";
import { addQuestion, addQuiz, createLocators } from "../fixtures/create";

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
    const { buttonQuizNextStep } = createLocators(page);
    await addQuiz(page, "quiz 1", false);

    await buttonQuizNextStep.click();

    await addQuestion(page, "question 1");

    await addQuestion(page, "question 2");
  });
});
