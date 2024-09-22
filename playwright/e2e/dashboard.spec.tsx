import { expect, test } from "@playwright/test";
import { Dashboard } from "playwright/fixtures/dashboard";

// Test suite for the "Dashboard Page" functionality
test.describe("Dashboard Page", () => {
  let dashboardPage: Dashboard;

  // Before each test, instantiate the DashboardPage and navigate to the dashboard page
  test.beforeEach(async ({ page }) => {
    dashboardPage = new Dashboard(page);
    await page.goto("/dashboard");
  });

  // Test to verify redirection from the base URL to the dashboard page
  test("Redirect from base url", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL(/dashboard/);
    await expect(page).toHaveTitle(/Dashboard/);
    expect(page.url()).not.toContain("?interval_by=");
  });

  test("Dashboard Card Tabs", async ({ page }) => {
    // When clicking on the day tab
    await dashboardPage.buttonTabDay.click();
    await expect(page).toHaveURL(/\?interval_by=day/);

    // When clicking on the week tab
    await dashboardPage.buttonTabWeek.click();
    await expect(page).toHaveURL(/\?interval_by=week/);

    // When clicking on the month tab
    await dashboardPage.buttonTabMonth.click();
    await expect(page).toHaveURL(/\?interval_by=month/);

    // When clicking on the all tab
    await dashboardPage.buttonTabAll.click();
    await expect(page).toHaveURL(/\?interval_by=all/);
  });
});
