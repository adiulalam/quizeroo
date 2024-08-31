import { type Locator } from "@playwright/test";

export const findLocatorIndex = async (
  locator: Locator,
  text: string,
): Promise<number> => {
  const count = await locator.count();

  for (let i = 0; i < count; i++) {
    const elementText = await locator.nth(i).textContent();

    if (elementText && elementText === text) {
      return i;
    }
  }

  throw new Error(`Element with text "${text}" not found.`);
};
