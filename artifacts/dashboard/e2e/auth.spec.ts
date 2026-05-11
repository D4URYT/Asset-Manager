import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = "admin@empresa.com";
const ADMIN_PASSWORD = "admin123";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function fillLogin(page: import("@playwright/test").Page, email: string, password: string) {
  await page.locator('[data-testid="input-login-email"]').fill(email);
  await page.locator('[data-testid="input-login-password"]').fill(password);
  await page.locator('[data-testid="btn-login-submit"]').click();
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(login)?$/, { timeout: 8000 });
  });

  test("shows the BusinessDash title and login form fields", async ({ page }) => {
    await expect(page.getByText("BusinessDash")).toBeVisible();
    await expect(page.locator('[data-testid="input-login-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-login-password"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-login-submit"]')).toBeVisible();
  });

  test("shows a link to the register page", async ({ page }) => {
    await expect(page.locator('[data-testid="link-register"]')).toBeVisible();
  });

  test("shows validation errors when submitting empty form", async ({ page }) => {
    await page.locator('[data-testid="btn-login-submit"]').click();
    // React Hook Form + Zod validation shows inline errors
    await expect(page.getByText(/invalid email|required/i)).toBeVisible({ timeout: 3000 });
  });

  test("shows a toast error on wrong credentials", async ({ page }) => {
    await fillLogin(page, "wrong@example.com", "wrongpass123");

    // Sonner renders toasts in a [data-sonner-toaster] portal
    await expect(
      page.locator("[data-sonner-toaster]").getByText(/invalid email or password|failed to login/i),
    ).toBeVisible({ timeout: 8000 });
  });

  test("logs in successfully and redirects away from login", async ({ page }) => {
    await fillLogin(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await expect(page).not.toHaveURL(/\/login/, { timeout: 10000 });
  });

  test("persists session on page reload after login", async ({ page }) => {
    await fillLogin(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await expect(page).not.toHaveURL(/\/login/, { timeout: 10000 });
    await page.reload();
    await expect(page).not.toHaveURL(/\/login/, { timeout: 8000 });
  });
});

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------
test.describe("Register page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-testid="link-register"]').click();
    await expect(page).toHaveURL(/\/register/, { timeout: 5000 });
  });

  test("shows the registration form fields", async ({ page }) => {
    await expect(page.getByText("Create an account")).toBeVisible();
    await expect(page.locator('[data-testid="input-register-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-register-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-register-password"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-register-submit"]')).toBeVisible();
  });

  test("shows a link back to login", async ({ page }) => {
    await expect(page.locator('[data-testid="link-login"]')).toBeVisible();
  });

  test("registers a new user and redirects away from register page", async ({ page }) => {
    const unique = Date.now();
    await page.locator('[data-testid="input-register-name"]').fill("Test User");
    await page.locator('[data-testid="input-register-email"]').fill(`testuser_${unique}@example.com`);
    await page.locator('[data-testid="input-register-password"]').fill("TestPass99");
    await page.locator('[data-testid="btn-register-submit"]').click();

    await expect(page).not.toHaveURL(/\/register/, { timeout: 10000 });
  });

  test("shows toast error when email is already registered", async ({ page }) => {
    await page.locator('[data-testid="input-register-name"]').fill("Duplicate Admin");
    await page.locator('[data-testid="input-register-email"]').fill(ADMIN_EMAIL);
    await page.locator('[data-testid="input-register-password"]').fill("SomePass99");
    await page.locator('[data-testid="btn-register-submit"]').click();

    await expect(
      page.locator("[data-sonner-toaster]").getByText(/email already in use|already registered/i),
    ).toBeVisible({ timeout: 8000 });
  });

  test("shows validation error when name is too short", async ({ page }) => {
    // Fill a short name (< 2 chars) and valid email + password,
    // then submit — React Hook Form shows inline error for name
    await page.locator('[data-testid="input-register-name"]').fill("A");
    await page.locator('[data-testid="input-register-email"]').fill("valid@example.com");
    await page.locator('[data-testid="input-register-password"]').fill("pass123");
    await page.locator('[data-testid="btn-register-submit"]').click();
    await expect(page.getByText(/at least 2 characters/i)).toBeVisible({ timeout: 3000 });
  });
});

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------
test.describe("Logout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-testid="input-login-email"]').fill(ADMIN_EMAIL);
    await page.locator('[data-testid="input-login-password"]').fill(ADMIN_PASSWORD);
    await page.locator('[data-testid="btn-login-submit"]').click();
    await expect(page).not.toHaveURL(/\/login/, { timeout: 10000 });
  });

  test("clicking nav logout button redirects to login", async ({ page }) => {
    await page.locator('[data-testid="nav-logout"]').click();
    await expect(page).toHaveURL(/\/(login)?$/, { timeout: 8000 });
  });
});
