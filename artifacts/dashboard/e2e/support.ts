import { expect, type Page } from "@playwright/test";

export const TEST_EMAIL = "elwilcraft@gmail.com";
export const TEST_PASSWORD = "123456";
export const DEFAULT_ROUTE = "/products";

export async function login(page: Page, email = TEST_EMAIL, password = TEST_PASSWORD) {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
  await page.getByTestId("input-login-email").fill(email);
  await page.getByTestId("input-login-password").fill(password);
  await page.getByTestId("btn-login-submit").click();
  await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
}

export async function loginAsStandardUser(page: Page) {
  await login(page);
}
