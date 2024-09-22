import { type Page, type Locator } from "@playwright/test";

export class Serve {
  // Serve locators - heading
  public readonly headingRoomCode: Locator;

  // Action button
  public readonly buttonServeAction: Locator;

  // Serve locators - waiting
  public readonly headingServeUser: Locator;

  // Serve locators - quiz
  public readonly headingAnswerCount: Locator;

  // Result
  public readonly tableServeResult: Locator;

  constructor(public readonly page: Page) {
    // Initialize locators for various dashboard elements
    this.headingRoomCode = this.page.getByTestId("heading-room-code");

    this.buttonServeAction = this.page.getByTestId("button-serve-action");

    this.headingServeUser = this.page.getByTestId("heading-serve-user");

    this.headingAnswerCount = this.page.getByTestId("heading-answer-count");

    this.tableServeResult = this.page.getByTestId("table-serve-result");
  }
}
