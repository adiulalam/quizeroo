import { chromium } from "@playwright/test";
import type { FullConfig } from "@playwright/test";

import { db } from "@/server/db";

const storageState = "__tests__/setup/storageState.host.json";

export default async function globalSetup(config: FullConfig) {
  const baseUrl = config.projects[0]?.use.baseURL;

  const data = {
    name: "Octocat",
    email: "octocat@github.com",
    image: "https://github.com/octocat.png",
    phone: null,
    gender: null,
    dateOfBirth: null,
  };

  await db.user.upsert({
    where: {
      email: "octocat@github.com",
    },
    create: data,
    update: data,
  });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const signInUrl = "/api/auth/signin?callbackUrl=%2F";
  const email = "octocat@github.com";
  const test_id = process.env.TEST_ID!;

  await page.goto(baseUrl + signInUrl);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Test Id").fill(test_id);
  await page
    .getByRole("button", { name: "Sign in with TestCredentials" })
    .click();

  await page.waitForURL(baseUrl + "/", { waitUntil: "networkidle" });

  await page.context().storageState({ path: storageState });
  await browser.close();
}
