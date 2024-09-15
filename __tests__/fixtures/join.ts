import { type Page, type Locator } from "@playwright/test";

export class Join {
  // Serve locators - Room
  public readonly buttonRoomJoin: Locator;
  public readonly inputRoomName: Locator;
  public readonly buttonRoomEnter: Locator;

  constructor(public readonly page: Page) {
    // Initialize locators for various dashboard elements
    this.buttonRoomJoin = this.page.getByTestId("join-room-button");
    this.inputRoomName = this.page.getByTestId("input-room-name");
    this.buttonRoomEnter = this.page.getByTestId("button-room-enter");
  }
}
