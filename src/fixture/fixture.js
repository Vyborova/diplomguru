import { test as base } from "@playwright/test";

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // ... логика авторизации
    await use(page);
  },
});
