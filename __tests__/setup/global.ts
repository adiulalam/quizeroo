import { chromium } from "@playwright/test";
import type { FullConfig } from "@playwright/test";

import { db } from "@/server/db";

const storageState = "__tests__/setup/storageState.host.json";

export default async function globalSetup(config: FullConfig) {
  const baseUrl = config.projects[0]?.use.baseURL;

  await db.user.upsert({
    where: {
      email: "octocat@github.com",
    },
    create: {
      name: "Octocat",
      email: "octocat@github.com",
      image: "https://github.com/octocat.png",
    },
    update: {},
  });

  const browser = await chromium.launch();

  const page = await browser.newPage();

  const signInUrl = "/api/auth/signin?callbackUrl=%2F";

  await page.goto(baseUrl + signInUrl);
  await page.getByLabel("Email").fill("octocat@github.com");
  await page
    .getByRole("button", { name: "Sign in with TestCredentials" })
    .click();

  await page.waitForURL(baseUrl + "/", { waitUntil: "networkidle" });

  await page.context().storageState({ path: storageState });
  await browser.close();
}
