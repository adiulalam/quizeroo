import { expect, test } from "@playwright/test";
import { Profile } from "__tests__/fixtures/profile";

// Test suite for the "Profile Page" functionality
test.describe.serial("Profile Page", () => {
  let profilePage: Profile;

  // Before each test, instantiate the ProfilePage and navigate to the profile page
  test.beforeEach(async ({ page }) => {
    profilePage = new Profile(page);
    await page.goto("/profile");
  });

  // Test to verify redirection from the base URL to the profile page
  test("Redirect from base url", async ({ page }) => {
    await page.goto("/profile");
    await page.waitForURL(/profile/);
    await expect(page).toHaveTitle(/Profile/);
  });

  test("Update profile", async () => {
    await expect(profilePage.profileCard).toBeVisible();

    // Fill in name
    await profilePage.inputName.fill("Octocat updated");
    await expect(profilePage.inputName).toHaveValue("Octocat updated");

    // Fill in phone
    await profilePage.inputPhone.fill("0123456789");
    await expect(profilePage.inputPhone).toHaveValue("0123456789");

    // Fill in gender
    await profilePage.inputRadioMale.click();
    await expect(profilePage.inputRadioMale).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(profilePage.inputRadioMale).toHaveAttribute(
      "data-state",
      "checked",
    );

    // Fill in DoB
    await profilePage.buttonDob.click();

    await profilePage.buttonCalendarMonths.click();
    await profilePage.optionCalendarMonths.filter({ hasText: "March" }).click();
    await expect(profilePage.optionCalendarMonths).toBeHidden();

    await profilePage.buttonCalendarYears.click();
    await profilePage.optionCalendarYears.filter({ hasText: "2000" }).click();
    await expect(profilePage.optionCalendarYears).toBeHidden();

    await profilePage.buttonCalendarDays
      .getByText("17", { exact: true })
      .click();
    await profilePage.buttonDob.click(); // Click again to hide the modal
    await expect(profilePage.buttonDob).toHaveText("17 Mar 2000");

    // Click submit
    await profilePage.buttonSubmit.click();

    // Check for toast
    await expect(profilePage.toastMessage).toHaveText(
      "Profile updated successfully",
    );
    await profilePage.buttonCloseToast.click();
    await expect(profilePage.toastMessage).toBeHidden();
  });
});
