import { type Page, type Locator } from "@playwright/test";

export class Serve {
  // Serve locators - heading
  public readonly headingRoomCode: Locator;

  constructor(public readonly page: Page) {
    // Initialize locators for various dashboard elements
    this.headingRoomCode = this.page.getByTestId("heading-room-code");
  }
}
