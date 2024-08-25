import { type Page, expect } from "@playwright/test";

// Function to create locators
export const createLocators = (page: Page) => {
  return {
    // view quiz
    quizItems: page.getByTestId("quiz-items"),
    quizCard: page.getByTestId("quiz-card"),
    quizDialog: page.getByTestId("quiz-dialog"),
    closeDialog: page.getByTestId("button-close-dialog"),

    // create quiz
    buttonCreateQuiz: page.getByTestId("button-create-quiz"),

    // todo: update

    // todo: delete

    // mutation - quiz step
    inputQuizTitle: page.getByTestId("input-quiz-title"),
    switchQuizFavourite: page.getByTestId("switch-quiz-favourite"),

    // view - question step
    questionItems: page.getByTestId("question-items"),
    questionCard: page.getByTestId("question-card"),

    // mutation - question step
    buttonCreateQuestion: page.getByTestId("button-create-question"),
    buttonToggleQuestion: page.getByTestId("button-toggle-question"), // Expander button
    buttonGripQuestion: page.getByTestId("button-grip-question"), // Drag and drop button

    headerQuestionTitle: page.getByTestId("header-question-title"),
    inputQuestionTitle: page.getByTestId("input-question-title"),

    buttonDeleteQuestion: page.getByTestId("button-delete-question"),

    // view - answer step
    answerCard: page.getByTestId("answer-card"),

    buttonCreateAnswer: page.getByTestId("button-create-answer"),
    buttonGripAnswer: page.getByTestId("button-grip-answer"),

    // mutation - answer step
    inputAnswerTitle: page.getByTestId("input-answer-title"),
    switchAnswerCorrect: page.getByTestId("switch-answer-correct"),

    buttonDeleteAnswer: page.getByTestId("button-delete-answer"),

    // mutation - footer
    buttonQuizNextStep: page.getByTestId("button-quiz-next-step"),
    buttonQuizPrevStep: page.getByTestId("button-quiz-prev-step"),
  };
};

// Function to add a new quiz
export const addQuiz = async (
  page: Page,
  text: string,
  setFavourite: boolean,
) => {
  const { buttonCreateQuiz, quizDialog, inputQuizTitle, switchQuizFavourite } =
    createLocators(page);

  await buttonCreateQuiz.click();
  await expect(quizDialog).toBeVisible();

  await inputQuizTitle.fill(text);
  await expect(inputQuizTitle).toHaveValue(text);

  if (setFavourite) {
    await switchQuizFavourite.click();
    await expect(switchQuizFavourite).toHaveAttribute("aria-checked", "true");
    await expect(switchQuizFavourite).toHaveAttribute("data-state", "checked");
  } else {
    await expect(switchQuizFavourite).toHaveAttribute("aria-checked", "false");
    await expect(switchQuizFavourite).toHaveAttribute(
      "data-state",
      "unchecked",
    );
  }
};

// Function to add a new question
export const addQuestion = async (page: Page, text: string) => {
  const {
    buttonCreateQuestion,
    buttonToggleQuestion,
    inputQuestionTitle,
    headerQuestionTitle,
    questionCard,
  } = createLocators(page);

  const totalQuestion = await questionCard.count();

  // click on 'Add new question'
  await buttonCreateQuestion.click();

  // wait for new question to be added
  await expect(questionCard).toHaveCount(totalQuestion + 1);

  // select the latest question locator
  const lastButtonToggle = buttonToggleQuestion.last();
  const lastInputQuestion = inputQuestionTitle.last();
  const lastHeaderTitle = headerQuestionTitle.last();

  // click to expand
  await lastButtonToggle.click();
  await expect(lastButtonToggle).toHaveAttribute("aria-expanded", "true");

  // fill in the question
  await lastInputQuestion.fill(text);

  // Check if the question name has been saved
  await lastInputQuestion.blur();
  await expect(lastHeaderTitle).toHaveText(text);

  // click on collapse
  await lastButtonToggle.click();
  await expect(lastButtonToggle).toHaveAttribute("aria-expanded", "false");
};

// Function to add a new answer
export const addAnswer = async (
  page: Page,
  text: string,
  isCorrect: boolean,
) => {
  const {
    buttonCreateAnswer,
    buttonToggleQuestion,
    switchAnswerCorrect,
    inputAnswerTitle,
    answerCard,
  } = createLocators(page);
  // select the latest answer locator
  const lastButtonToggle = buttonToggleQuestion.last();
  const lastInputAnswer = inputAnswerTitle.last();
  const lastCorrectToggle = switchAnswerCorrect.last();

  // click to expand
  await lastButtonToggle.click();
  await expect(lastButtonToggle).toHaveAttribute("aria-expanded", "true");

  const totalAnswer = await answerCard.count();

  // click on 'Add new answer'
  await buttonCreateAnswer.click();

  // wait for new answer to be added
  await expect(answerCard).toHaveCount(totalAnswer + 1);

  // fill in the answer
  await lastInputAnswer.fill(text);

  // Check if the answer name has been saved
  await lastInputAnswer.blur();
  await expect(lastInputAnswer).toHaveAttribute("data-value", text);

  // Radio button for correct answer
  if (isCorrect) {
    await lastCorrectToggle.click();
    await expect(lastCorrectToggle).toHaveAttribute("aria-checked", "true");
    await expect(lastCorrectToggle).toHaveAttribute("data-state", "checked");
  } else {
    await expect(lastCorrectToggle).toHaveAttribute("aria-checked", "false");
    await expect(lastCorrectToggle).toHaveAttribute("data-state", "unchecked");
  }

  // click on collapse
  await lastButtonToggle.click();
  await expect(lastButtonToggle).toHaveAttribute("aria-expanded", "false");
};
