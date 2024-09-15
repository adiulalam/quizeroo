import { type Page, type Locator } from "@playwright/test";

export class Profile {
  // UI - toast
  public readonly toastMessage: Locator;
  public readonly buttonCloseToast: Locator;

  // Profile locators - view
  public readonly profileCard: Locator;

  // Profile locators - input
  public readonly inputName: Locator;
  public readonly inputImage: Locator;
  public readonly inputPhone: Locator;

  // Profile locators - radio
  public readonly inputRadioMale: Locator;
  public readonly inputRadioFemale: Locator;
  public readonly inputRadioOther: Locator;

  // Profile locators - date
  public readonly buttonDob: Locator;

  // Profile locators - submit
  public readonly buttonSubmit: Locator;

  // Profile locators - calendar
  public readonly buttonCalendarMonths: Locator;
  public readonly buttonCalendarYears: Locator;
  public readonly optionCalendarMonths: Locator;
  public readonly optionCalendarYears: Locator;

  public readonly buttonCalendarDays: Locator;

  constructor(public readonly page: Page) {
    // Initialize locators for various profile elements
    this.toastMessage = this.page.getByTestId("toast-message");
    this.buttonCloseToast = this.page.getByTestId("button-close-toast");

    this.profileCard = this.page.getByTestId("profile-card");

    this.inputName = this.page.getByTestId("input-name");
    this.inputImage = this.page.getByTestId("input-image");
    this.inputPhone = this.page.getByTestId("input-phone");

    this.inputRadioMale = this.page.getByTestId("input-radio-male");
    this.inputRadioFemale = this.page.getByTestId("input-radio-female");
    this.inputRadioOther = this.page.getByTestId("input-radio-other");

    this.buttonSubmit = this.page.getByTestId("button-submit");

    this.buttonDob = this.page.getByTestId("button-dob");

    this.buttonCalendarDays = this.page.getByRole("gridcell"); // .getByText('1', {exact: true});
    this.buttonCalendarMonths = this.page.getByTestId("button-calendar-months");
    this.buttonCalendarYears = this.page.getByTestId("button-calendar-years");
    this.optionCalendarMonths = this.page.getByTestId("option-calendar-months");
    this.optionCalendarYears = this.page.getByTestId("option-calendar-years");
  }
}
