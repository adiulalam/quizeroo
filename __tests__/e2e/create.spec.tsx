import { expect, test } from "@playwright/test";
import {
  addAnswer,
  addOrUpdateQuestion,
  addOrUpdateQuiz,
  createLocators,
} from "../fixtures/create";
import { findLocatorIndex } from "../setup/function";

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
    const {
      buttonQuizNextStep,
      buttonRestartQuiz,
      closeDialog,
      headerQuizTitle,
    } = createLocators(page);
    await addOrUpdateQuiz(page, false, "quiz 1", false);

    await buttonQuizNextStep.click();

    await addOrUpdateQuestion(page, false, "question 1", -1);
    await addAnswer(page, "question 1 answer 1 false", false);
    await addAnswer(page, "question 1 answer 2 true", true);

    await addOrUpdateQuestion(page, false, "question 2", -1);
    await addAnswer(page, "question 2 answer 2 true", true);

    await buttonQuizNextStep.click();
    await expect(buttonRestartQuiz).toBeVisible();

    await closeDialog.click();
    await expect(
      headerQuizTitle.filter({ hasText: "quiz 1" }).first(),
    ).toBeVisible();
  });

  test("Update quiz", async ({ page }) => {
    const {
      buttonMenuQuiz,
      quizCard,
      headerQuestionTitle,
      buttonQuizNextStep,
    } = createLocators(page);

    const quiz = quizCard.filter({ hasText: "quiz 1" }).first();
    await quiz.locator(buttonMenuQuiz).click();

    await addOrUpdateQuiz(page, true, "quiz 1 updated", false);

    await buttonQuizNextStep.click();
    await expect(headerQuestionTitle.nth(0)).toBeVisible();

    const questionOneIndex = await findLocatorIndex(
      headerQuestionTitle,
      "question 1",
    );
    await addOrUpdateQuestion(
      page,
      true,
      "question 1 updated",
      questionOneIndex,
    );

    const questionTwoIndex = await findLocatorIndex(
      headerQuestionTitle,
      "question 1",
    );
    await addOrUpdateQuestion(
      page,
      true,
      "question 2 updated",
      questionTwoIndex,
    );
  });
});
