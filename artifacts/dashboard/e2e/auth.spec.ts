import { expect, test } from "@playwright/test";
import { TEST_EMAIL, TEST_PASSWORD, login } from "./support";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("shows the BusinessDash title and login form fields", async ({ page }) => {
    await expect(page.getByText("BusinessDash")).toBeVisible();
    await expect(page.getByTestId("input-login-email")).toBeVisible();
    await expect(page.getByTestId("input-login-password")).toBeVisible();
    await expect(page.getByTestId("btn-login-submit")).toBeVisible();
  });

  test("shows validation errors when submitting empty form", async ({ page }) => {
    await page.getByTestId("btn-login-submit").click();
    await expect(page.getByText(/invalid email|required/i)).toBeVisible();
  });

  test("keeps the user on login after wrong credentials", async ({ page }) => {
    await page.getByTestId("input-login-email").fill("wrong@example.com");
    await page.getByTestId("input-login-password").fill("wrongpass123");
    await page.getByTestId("btn-login-submit").click();

    await expect(page).toHaveURL(/\/login$/, { timeout: 10000 });
    await expect(page.getByTestId("input-login-email")).toHaveValue("wrong@example.com");
  });

  test("logs in successfully and redirects away from login", async ({ page }) => {
    await login(page, TEST_EMAIL, TEST_PASSWORD);
    await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
  });

  test("persists session on page reload after login", async ({ page }) => {
    await login(page, TEST_EMAIL, TEST_PASSWORD);
    await page.reload();
    await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
  });
});

test.describe("Register page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL(/\/register$/);
  });

  test("shows the registration form fields", async ({ page }) => {
    await expect(page.getByText("Create an account")).toBeVisible();
    await expect(page.getByTestId("input-register-name")).toBeVisible();
    await expect(page.getByTestId("input-register-email")).toBeVisible();
    await expect(page.getByTestId("input-register-password")).toBeVisible();
    await expect(page.getByTestId("btn-register-submit")).toBeVisible();
  });

  test("shows a link back to login", async ({ page }) => {
    await page.getByTestId("link-login").click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("validates invalid email before submitting registration", async ({ page }) => {
    const emailInput = page.getByTestId("input-register-email");
    await page.getByTestId("input-register-name").fill("Test User");
    await emailInput.fill("correo-invalido");
    await page.getByTestId("input-register-password").fill("TestPass99");
    await page.getByTestId("btn-register-submit").click();

    await expect.poll(() =>
      emailInput.evaluate((element) => (element as HTMLInputElement).checkValidity()),
    ).toBe(false);
  });

  test("shows validation error when name is too short", async ({ page }) => {
    await page.getByTestId("input-register-name").fill("A");
    await page.getByTestId("input-register-email").fill("valid@example.com");
    await page.getByTestId("input-register-password").fill("pass123");
    await page.getByTestId("btn-register-submit").click();
    await expect(page.getByText(/at least 2 characters/i)).toBeVisible();
  });
});

test.describe("Logout", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
  });

  test("clicking nav logout button redirects to login", async ({ page }) => {
    await page.getByTestId("nav-logout").click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("user menu logout redirects to login", async ({ page }) => {
    await page.getByTestId("user-menu").click();
    await page.getByText("Log out").click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
