import { type Page, type Locator } from "@playwright/test";

export class Dashboard {
  // Dashboard locators - card tabs
  public readonly buttonTabDay: Locator;
  public readonly buttonTabWeek: Locator;
  public readonly buttonTabMonth: Locator;
  public readonly buttonTabAll: Locator;

  constructor(public readonly page: Page) {
    // Initialize locators for various dashboard elements
    this.buttonTabDay = this.page.getByTestId("button-tab-day");
    this.buttonTabWeek = this.page.getByTestId("button-tab-week");
    this.buttonTabMonth = this.page.getByTestId("button-tab-month");
    this.buttonTabAll = this.page.getByTestId("button-tab-all");
  }
}
