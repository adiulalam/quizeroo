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

    inputQuestionTitle: page.getByTestId("input-question-title"),

    buttonDeleteQuestion: page.getByTestId("button-delete-question"),

    // todo: mutation - question - answer step

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
