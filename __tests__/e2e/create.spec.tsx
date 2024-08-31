import { expect, test } from "@playwright/test";
import { Create } from "__tests__/fixtures/create";

// Test suite for the "Create Page" functionality
test.describe("Create Page", () => {
  let quizPage: Create;

  // Before each test, instantiate the QuizPage and navigate to the create page
  test.beforeEach(async ({ page }) => {
    quizPage = new Create(page);
    await page.goto("/create");
  });

  // Test to verify redirection from the base URL to the create page
  test("Redirect from base url", async ({ page }) => {
    await page.goto("/");

    // Click on the button to create a new room and verify redirection
    await page.getByTestId("create-room-button").click();
    await page.waitForURL(/create/);
    await expect(page).toHaveTitle(/Create/);
  });

  // Test to create a new quiz, add questions and answers
  test("Create quiz", async () => {
    // Create a new quiz with the title "quiz 1"
    await quizPage.addOrUpdateQuiz(false, "quiz 1", false);

    // Navigate to the next step (question creation)
    await quizPage.buttonQuizNextStep.click();

    // Add the first question and two answers
    await quizPage.addOrUpdateQuestion(false, "question 1", -1);
    await quizPage.addOrUpdateAnswer("q 1 a 1 false", false, false, -1, -1);
    await quizPage.addOrUpdateAnswer("q 1 a 2 true", true, false, -1, -1);

    // Add the second question and one answer
    await quizPage.addOrUpdateQuestion(false, "question 2", -1);
    await quizPage.addOrUpdateAnswer("q 2 a 1 true", true, false, -1, -1);

    // Complete the quiz creation and validate the creation process
    await quizPage.buttonQuizNextStep.click();
    await expect(quizPage.buttonRestartQuiz).toBeVisible();

    // Close the quiz dialog and verify the quiz title is visible on the main page
    await quizPage.closeDialog.click();
    await expect(
      quizPage.headerQuizTitle.filter({ hasText: "quiz 1" }).first(),
    ).toBeVisible();
  });

  // Test to update an existing quiz
  test("Update quiz", async () => {
    // Find the quiz with the title "quiz 1" and open the menu to edit it
    const quiz = quizPage.quizCard.filter({ hasText: "quiz 1" }).first();
    await quiz.locator(quizPage.buttonMenuQuiz).click();

    // Update the quiz title to "quiz 1 updated"
    await quizPage.addOrUpdateQuiz(true, "quiz 1 updated", false);

    // Navigate to the next step (question updating)
    await quizPage.buttonQuizNextStep.click();
    await expect(quizPage.headerQuestionTitle.nth(0)).toBeVisible();

    // Update the first question and its answers
    const qOneIndex = 0;
    await quizPage.addOrUpdateQuestion(true, "question 1 updated", qOneIndex);
    await quizPage.addOrUpdateAnswer(
      "q 1 a 1 false updated",
      true,
      true,
      qOneIndex,
      0,
    );
    await quizPage.addOrUpdateAnswer(
      "q 1 a 2 true updated",
      true,
      true,
      qOneIndex,
      1,
    );

    // Update the second question and its answer
    const qTwoIndex = 1;
    await quizPage.addOrUpdateQuestion(true, "question 2 updated", qTwoIndex);
    await quizPage.addOrUpdateAnswer(
      "q 2 a 1 true updated",
      true,
      true,
      qTwoIndex,
      0,
    );

    // Complete the quiz update and validate the update process
    await quizPage.buttonQuizNextStep.click();
    await expect(quizPage.quizDialog).toBeHidden();
    await expect(
      quizPage.headerQuizTitle.filter({ hasText: "quiz 1 updated" }).first(),
    ).toBeVisible();
  });
});
