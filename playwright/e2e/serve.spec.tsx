import { expect, test } from "@playwright/test";
import { Create } from "playwright/fixtures/create";
import { Join } from "playwright/fixtures/join";
import { Serve } from "playwright/fixtures/serve";

// Test suite for the "Serve and Join Page" functionality
test.describe.serial("Serve and Join Page", () => {
  let createPage: Create;

  // Create a new quiz, add questions and answers
  test("Create quiz", async ({ page }) => {
    createPage = new Create(page);
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
  });

  test("Start quiz", async ({ page }) => {
    createPage = new Create(page);
    await page.goto("/create");

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

    // Change the status to completed
    await quizCard.locator(createPage.buttonMenuQuiz).click();
    await createPage.menuItemStatus.click();
    await expect(quizCard.locator(createPage.quizBadgeStatus)).toHaveText(
      "COMPLETED",
    );

    // Initiate quiz to start
    await quizCard.locator(createPage.buttonInitiateQuiz).click();
    await expect(createPage.toastMessage).toHaveText("Session started");
    await createPage.buttonCloseToast.click();
    await expect(createPage.toastMessage).toBeHidden();
  });

  test("Serve and Join", async ({ page, browser }) => {
    createPage = new Create(page);
    await page.goto("/create");

    // Serve page
    const quizCard = createPage.quizCard
      .filter({ hasText: "create and serve" })
      .first();
    const pagePromise = page.waitForEvent("popup");
    await quizCard.locator(createPage.linkServeQuiz).click();

    const serve = await pagePromise;
    const servePage = new Serve(serve);

    await serve.waitForURL(/serve/);
    await expect(serve).toHaveTitle(/Serve/);

    // Room code
    const roomCode = (await servePage.headingRoomCode.textContent()) ?? "";

    // Join page
    const context = await browser.newContext();
    await context.clearCookies();
    const join = await context.newPage();
    const joinPage = new Join(join);

    // Join the room
    await join.goto("/");
    await joinPage.buttonRoomJoin.click();
    await joinPage.inputRoomName.fill(roomCode);
    await joinPage.buttonRoomEnter.click();

    await join.waitForURL(/join/);
    await expect(join).toHaveTitle(/Join/);

    // Enter name for temp user
    const username = "Adiul Alam";
    await joinPage.inputJoinName.fill(username);
    await joinPage.buttonJoinSubmit.click();
    await expect(joinPage.headingJoinUsername).toHaveText(username);
    await expect(servePage.headingServeUser.first()).toHaveText(username);

    // Start the quiz
    await servePage.buttonServeAction.click();
    const currentCount = +servePage.headingAnswerCount.textContent() || 0;

    // First choose incorrect answer
    const q1Answer = joinPage.buttonAnswer.filter({ hasText: "q 1 a 1 false" });
    await expect(q1Answer).toBeEnabled();
    await q1Answer.click();
    await expect(joinPage.headingAnswerSubmitted).toHaveText(
      "Your answer has been submitted!",
    );
    await expect(servePage.headingAnswerCount).toHaveText(
      (currentCount + 1).toString(),
    ); // This step might be flaky
    await servePage.buttonServeAction.click();
    await expect(joinPage.headingQuestionOutcome).toHaveText("Incorrect");

    // Second question correct answer
    await servePage.buttonServeAction.click();
    const q2Answer = joinPage.buttonAnswer.filter({ hasText: "q 2 a 1 true" });
    await expect(q2Answer).toBeEnabled();
    await q2Answer.click();
    await expect(joinPage.headingAnswerSubmitted).toHaveText(
      "Your answer has been submitted!",
    );
    await expect(servePage.headingAnswerCount).toHaveText(
      (currentCount + 1).toString(),
    );
    await servePage.buttonServeAction.click();
    await expect(joinPage.headingQuestionOutcome).toHaveText("Correct");

    // Finishing up the question
    await expect(servePage.tableServeResult).toBeVisible();

    // close up everything
    await context.close();
  });

  test("Delete quiz", async ({ page }) => {
    createPage = new Create(page);
    await page.goto("/create");

    await createPage.removeQuiz("create and serve");

    await expect(createPage.toastMessage).toHaveText(
      "Quiz Deleted Successfully",
    );
    await createPage.buttonCloseToast.click();
    await expect(createPage.toastMessage).toBeHidden();
  });
});
