import { expect, test } from "@playwright/test";
import { Create } from "__tests__/fixtures/create";

// Test suite for the "Create Page" functionality
// Currently it's is serial, but maybe have each tests isolated? to have parallelism.
test.describe.serial("Create Page", () => {
  let createPage: Create;

  // Before each test, instantiate the CreatePage and navigate to the create page
  test.beforeEach(async ({ page }) => {
    createPage = new Create(page);
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
    await createPage.addOrUpdateQuiz(false, "quiz 1", false);

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

    // Close the quiz dialog and verify the quiz title is visible on the main page
    await createPage.closeDialog.click();
    await expect(
      createPage.headerQuizTitle.filter({ hasText: "quiz 1" }).first(),
    ).toBeVisible();
  });

  // Test to update an existing quiz
  test("Update quiz", async () => {
    // Find the quiz with the title "quiz 1" and open the menu to edit it
    const quiz = createPage.quizCard.filter({ hasText: "quiz 1" }).first();
    await quiz.locator(createPage.buttonMenuQuiz).click();

    // Update the quiz title to "quiz 1 updated"
    await createPage.addOrUpdateQuiz(true, "quiz 1 updated", false);

    // Navigate to the next step (question updating)
    await createPage.buttonQuizNextStep.click();
    await expect(createPage.headerQuestionTitle.nth(0)).toBeVisible();

    // Update the first question and its answers
    const qOneIndex = 0;
    await createPage.addOrUpdateQuestion(true, "question 1 updated", qOneIndex);
    await createPage.addOrUpdateAnswer(
      "q 1 a 1 false updated",
      true,
      true,
      qOneIndex,
      0,
    );
    await createPage.addOrUpdateAnswer(
      "q 1 a 2 true updated",
      true,
      true,
      qOneIndex,
      1,
    );

    // Update the second question and its answer
    const qTwoIndex = 1;
    await createPage.addOrUpdateQuestion(true, "question 2 updated", qTwoIndex);
    await createPage.addOrUpdateAnswer(
      "q 2 a 1 true updated",
      true,
      true,
      qTwoIndex,
      0,
    );

    // Complete the quiz update and validate the update process
    await createPage.buttonQuizNextStep.click();
    await expect(createPage.quizDialog).toBeHidden();
    await expect(
      createPage.headerQuizTitle.filter({ hasText: "quiz 1 updated" }).first(),
    ).toBeVisible();
  });

  // Test to delete an existing quiz
  test("Delete quiz", async () => {
    await createPage.removeQuiz("quiz 1 updated");

    await expect(createPage.toastMessage).toHaveText(
      "Quiz Deleted Successfully",
    );
    await createPage.buttonCloseToast.click();
    await expect(createPage.toastMessage).toBeHidden();
  });

  // test("Delete all quiz", async () => {
  //   await createPage.removeAllQuiz();
  // });
});
