import { expect, test } from "@playwright/test";
import { Create } from "__tests__/fixtures/create";

// Test suite for the "Serve and Join Page" functionality
test.describe.serial("Serve and Join Page", () => {
  // Create a new quiz, add questions and answers
  test("Create quiz", async ({ page }) => {
    const createPage = new Create(page);

    await page.goto("/create");

    // Create a new quiz with the title "create and serve"
    await createPage.addOrUpdateQuiz(false, "create and serve", false);

    // Navigate to the next step (question creation)
    await createPage.buttonQuizNextStep.click();

    // Add the first question and two answers
    await createPage.addOrUpdateQuestion(false, "question 1", -1);
    await createPage.addOrUpdateAnswer("q 1 a 1 false", false, false, -1, -1);
    await createPage.addOrUpdateAnswer("q 1 a 2 true", true, false, -1, -1);

    // Add the second question and one answer
    await createPage.addOrUpdateQuestion(false, "question 2", -1);
    await createPage.addOrUpdateAnswer("q 2 a 1 true", true, false, -1, -1);

    // Complete the quiz creation and validate the creation process
    await createPage.buttonQuizNextStep.click();
    await expect(createPage.buttonRestartQuiz).toBeVisible();

    // Close the quiz dialog
    await createPage.closeDialog.click();

    // verify the quiz title is visible on the main page
    const quizCard = createPage.quizCard
      .filter({ hasText: "create and serve" })
      .first();
    await expect(quizCard.locator(createPage.headerQuizTitle)).toHaveText(
      "create and serve",
    );
    await expect(quizCard.locator(createPage.quizBadgeStatus)).toHaveText(
      "DRAFT",
    );
  });
});
