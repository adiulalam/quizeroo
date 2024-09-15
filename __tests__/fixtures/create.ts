import { type Page, type Locator, expect } from "@playwright/test";

export class Create {
  // UI - toast
  public readonly toastMessage: Locator;
  public readonly buttonCloseToast: Locator;

  // View quiz locators
  private readonly headerNoQuiz: Locator;
  private readonly quizItems: Locator;
  public readonly quizCard: Locator;
  public readonly headerQuizTitle: Locator;
  public readonly quizDialog: Locator;
  public readonly closeDialog: Locator;
  public readonly quizBadgeFavourite: Locator;
  public readonly quizBadgeStatus: Locator;

  // Create quiz locators
  private readonly buttonCreateQuiz: Locator;
  public readonly buttonRestartQuiz: Locator;

  // Quiz menu update locators
  public readonly buttonMenuQuiz: Locator;
  private readonly menuItemEdit: Locator;
  private readonly menuItemFavourite: Locator;
  private readonly menuItemStatus: Locator;
  private readonly menuItemDelete: Locator;
  private readonly buttonDeleteContinue: Locator;
  private readonly buttonDeleteCancel: Locator;

  // Quiz mutation step locators
  private readonly inputQuizTitle: Locator;
  private readonly switchQuizFavourite: Locator;

  // View question step locators
  private readonly questionItems: Locator;
  private readonly questionCard: Locator;

  // Question mutation step locators
  private readonly buttonCreateQuestion: Locator;
  private readonly buttonToggleQuestion: Locator;
  private readonly buttonGripQuestion: Locator;
  public readonly headerQuestionTitle: Locator;
  private readonly inputQuestionTitle: Locator;
  private readonly buttonDeleteQuestion: Locator;

  // View answer step locators
  private readonly answerCard: Locator;

  // Answer mutation step locators
  private readonly buttonCreateAnswer: Locator;
  private readonly buttonGripAnswer: Locator;
  private readonly inputAnswerTitle: Locator;
  private readonly switchAnswerCorrect: Locator;

  // Footer navigation locators
  public readonly buttonQuizNextStep: Locator;
  private readonly buttonQuizPrevStep: Locator;

  constructor(public readonly page: Page) {
    // Initialize locators for various quiz elements
    this.toastMessage = this.page.getByTestId("toast-message");
    this.buttonCloseToast = this.page.getByTestId("button-close-toast");

    this.headerNoQuiz = this.page.getByTestId("header-no-quiz");
    this.quizItems = this.page.getByTestId("quiz-items");
    this.quizCard = this.page.getByTestId("quiz-card");
    this.headerQuizTitle = this.page.getByTestId("header-quiz-title");
    this.quizDialog = this.page.getByTestId("quiz-dialog");
    this.closeDialog = this.page.getByTestId("button-close-dialog");
    this.quizBadgeFavourite = this.page.getByTestId("quiz-badge-favourite");
    this.quizBadgeStatus = this.page.getByTestId("quiz-badge-status");

    this.buttonCreateQuiz = this.page.getByTestId("button-create-quiz");
    this.buttonRestartQuiz = this.page.getByTestId("button-restart-quiz");

    this.buttonMenuQuiz = this.page.getByTestId("button-menu-quiz");
    this.menuItemEdit = this.page.getByTestId("menu-item-edit");
    this.menuItemFavourite = this.page.getByTestId("menu-item-favourite");
    this.menuItemStatus = this.page.getByTestId("menu-item-status");
    this.menuItemDelete = this.page.getByTestId("menu-item-delete");
    this.buttonDeleteContinue = this.page.getByTestId("button-delete-continue");
    this.buttonDeleteCancel = this.page.getByTestId("button-delete-cancel");

    this.inputQuizTitle = this.page.getByTestId("input-quiz-title");
    this.switchQuizFavourite = this.page.getByTestId("switch-quiz-favourite");

    this.questionItems = this.page.getByTestId("question-items");
    this.questionCard = this.page.getByTestId("question-card");

    this.buttonCreateQuestion = this.page.getByTestId("button-create-question");
    this.buttonToggleQuestion = this.page.getByTestId("button-toggle-question");
    this.buttonGripQuestion = this.page.getByTestId("button-grip-question");
    this.headerQuestionTitle = this.page.getByTestId("header-question-title");
    this.inputQuestionTitle = this.page.getByTestId("input-question-title");
    this.buttonDeleteQuestion = this.page.getByTestId("button-delete-question");

    this.answerCard = this.page.getByTestId("answer-card");

    this.buttonCreateAnswer = this.page.getByTestId("button-create-answer");
    this.buttonGripAnswer = this.page.getByTestId("button-grip-answer");
    this.inputAnswerTitle = this.page.getByTestId("input-answer-title");
    this.switchAnswerCorrect = this.page.getByTestId("switch-answer-correct");

    this.buttonQuizNextStep = this.page.getByTestId("button-quiz-next-step");
    this.buttonQuizPrevStep = this.page.getByTestId("button-quiz-prev-step");
  }

  /**
   * Function to add or update a quiz.
   * @param isUpdate - Whether this is an update operation.
   * @param text - The quiz title.
   * @param setFavourite - Whether to set the quiz as a favorite.
   */
  async addOrUpdateQuiz(
    isUpdate: boolean,
    text: string,
    setFavourite: boolean,
  ) {
    if (isUpdate) {
      // Click on 'Edit' from the quiz menu
      await this.menuItemEdit.click();
    } else {
      // Click on 'Add new quiz'
      await this.buttonCreateQuiz.click();
    }
    // Ensure that the quiz dialog is visible
    await expect(this.quizDialog).toBeVisible();

    // Fill in the quiz title
    await this.inputQuizTitle.fill(text);
    await expect(this.inputQuizTitle).toHaveValue(text);

    // Set the quiz as a favorite if required
    if (setFavourite) {
      await this.switchQuizFavourite.click();
      await expect(this.switchQuizFavourite).toHaveAttribute(
        "aria-checked",
        "true",
      );
      await expect(this.switchQuizFavourite).toHaveAttribute(
        "data-state",
        "checked",
      );
    } else {
      await expect(this.switchQuizFavourite).toHaveAttribute(
        "aria-checked",
        "false",
      );
      await expect(this.switchQuizFavourite).toHaveAttribute(
        "data-state",
        "unchecked",
      );
    }
  }

  /**
   * Function to add or update a question.
   * @param isUpdate - Whether this is an update operation.
   * @param text - The question text.
   * @param questionPosition - The position of the question in the list.
   */
  async addOrUpdateQuestion(
    isUpdate: boolean,
    text: string,
    questionPosition: number,
  ) {
    if (!isUpdate) {
      // Get the current number of questions
      const totalQuestion = await this.questionCard.count();
      // Click on 'Add new question'
      await this.buttonCreateQuestion.click();
      // Wait for a new question to be added
      await expect(this.questionCard).toHaveCount(totalQuestion + 1);
    }

    // Select the nth question locator
    const questionToggle = this.buttonToggleQuestion.nth(questionPosition);
    const questionTitle = this.headerQuestionTitle.nth(questionPosition);

    // Expand the question section
    await questionToggle.click();
    await expect(questionToggle).toHaveAttribute("aria-expanded", "true");

    // Fill in the question title
    await this.inputQuestionTitle.fill(text);
    await this.inputQuestionTitle.blur();
    await expect(questionTitle).toHaveText(text);

    // Collapse the question section
    await questionToggle.click();
    await expect(questionToggle).toHaveAttribute("aria-expanded", "false");
  }

  /**
   * Function to add or update an answer.
   * @param text - The answer text.
   * @param isCorrect - Whether this answer is marked as correct.
   * @param isUpdate - Whether this is an update operation.
   * @param questionPosition - The position of the question in the list.
   * @param answerPosition - The position of the answer in the list.
   */
  async addOrUpdateAnswer(
    text: string,
    isCorrect: boolean,
    isUpdate: boolean,
    questionPosition: number,
    answerPosition: number,
  ) {
    // Select the nth question expander locator
    const questionToggle = this.buttonToggleQuestion.nth(questionPosition);

    // Expand the question section
    await questionToggle.click();
    await expect(questionToggle).toHaveAttribute("aria-expanded", "true");

    if (!isUpdate) {
      // Get the current number of answers
      const totalAnswer = await this.answerCard.count();
      // Click on 'Add new answer'
      await this.buttonCreateAnswer.click();
      // Wait for a new answer to be added
      await expect(this.answerCard).toHaveCount(totalAnswer + 1);
    }

    // Select the nth answer locator
    const answerTitle = this.inputAnswerTitle.nth(answerPosition);
    const answerCorrectToggle = this.switchAnswerCorrect.nth(answerPosition);

    // Fill in the answer title
    await answerTitle.fill(text);
    await answerTitle.blur();
    await expect(answerTitle).toHaveAttribute("data-value", text);

    // Set the correct answer if required
    const dataState = await answerCorrectToggle.getAttribute("data-state");
    if (isCorrect && dataState === "unchecked") {
      await answerCorrectToggle.click();
    } else if (!isCorrect && dataState === "checked") {
      await answerCorrectToggle.click();
    }

    // Validate the correct answer state
    await expect(answerCorrectToggle).toHaveAttribute(
      "aria-checked",
      isCorrect ? "true" : "false",
    );
    await expect(answerCorrectToggle).toHaveAttribute(
      "data-state",
      isCorrect ? "checked" : "unchecked",
    );

    // Collapse the question section
    await questionToggle.click();
    await expect(questionToggle).toHaveAttribute("aria-expanded", "false");
  }

  /**
   * Function to remove an quiz.
   * @param text - The quiz text.
   */
  async removeQuiz(text: string) {
    const quiz = this.quizCard.filter({ hasText: text }).first();
    await quiz.locator(this.buttonMenuQuiz).click();
    await this.menuItemDelete.click();
    await this.buttonDeleteContinue.click();
  }

  /**
   * Function to remove all quizzes.
   */
  async removeAllQuiz() {
    await expect(this.headerNoQuiz.or(this.quizCard.first())).toBeVisible();

    while ((await this.quizCard.count()) > 0) {
      const quiz = this.quizCard.first();
      await quiz.locator(this.buttonMenuQuiz).click();
      await this.menuItemDelete.click();
      await this.buttonDeleteContinue.click();

      await expect(this.toastMessage).toHaveText("Quiz Deleted Successfully");
      await this.buttonCloseToast.click();
      await expect(this.toastMessage).toBeHidden();
    }

    await expect(this.headerNoQuiz).toBeVisible();
  }
}
