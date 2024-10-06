import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000";

// Only way to prevent accident - can be any random uuid
const TEST_ID = "911e0b79-5421-4a21-af54-1cba3d99de5d";
process.env.TEST_ID = TEST_ID;

export default defineConfig({
  testDir: "./playwright/e2e/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: baseUrl,
    trace: "on-first-retry",
    storageState: "./playwright/setup/storageState.host.json",
  },
  globalSetup: "./playwright/setup/global.ts",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
  },
});
