import { type Page, type Locator } from "@playwright/test";

export class Join {
  // Serve locators - Room
  public readonly buttonRoomJoin: Locator;
  public readonly inputRoomName: Locator;
  public readonly buttonRoomEnter: Locator;

  // Serve locators - join modal
  public readonly inputJoinName: Locator;
  public readonly buttonJoinSubmit: Locator;
  public readonly headingJoinUsername: Locator;

  constructor(public readonly page: Page) {
    // Initialize locators for various dashboard elements
    this.buttonRoomJoin = this.page.getByTestId("join-room-button");
    this.inputRoomName = this.page.getByTestId("input-room-name");
    this.buttonRoomEnter = this.page.getByTestId("button-room-enter");

    this.inputJoinName = this.page.getByTestId("input-join-name");
    this.buttonJoinSubmit = this.page.getByTestId("button-join-submit");
    this.headingJoinUsername = this.page.getByTestId("heading-join-username");
  }
}
