import { expect, test, type Page } from "@playwright/test";

const ADMIN_EMAIL = "elwilcraft@gmail.com";
const ADMIN_PASSWORD = "123456";

async function login(page: Page, email = ADMIN_EMAIL, password = ADMIN_PASSWORD) {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
  await page.getByTestId("input-login-email").fill(email);
  await page.getByTestId("input-login-password").fill(password);
  await page.getByTestId("btn-login-submit").click();
}

test.describe("Authentication - Login", () => {
  test("redirects unauthenticated users from root to login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText("BusinessDash")).toBeVisible();
  });

  test("shows the login form fields", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByTestId("input-login-email")).toBeVisible();
    await expect(page.getByTestId("input-login-password")).toBeVisible();
    await expect(page.getByTestId("btn-login-submit")).toBeVisible();
    await expect(page.getByTestId("link-register")).toBeVisible();
  });

  test("validates invalid email format", async ({ page }) => {
    await page.goto("/login");
    const emailInput = page.getByTestId("input-login-email");
    await emailInput.fill("correo-invalido");
    await page.getByTestId("input-login-password").fill("123456");
    await page.getByTestId("btn-login-submit").click();

    await expect.poll(() =>
      emailInput.evaluate((element) => (element as HTMLInputElement).checkValidity()),
    ).toBe(false);
    await expect.poll(() =>
      emailInput.evaluate((element) => (element as HTMLInputElement).validationMessage.length),
    ).toBeGreaterThan(0);
  });

  test("validates missing password", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("input-login-email").fill(ADMIN_EMAIL);
    await page.getByTestId("btn-login-submit").click();

    await expect(page.getByText("Password must be at least 6 characters")).toBeVisible();
  });

  test("navigates to register page from login", async ({ page }) => {
    await page.goto("/login");
    await page.getByTestId("link-register").click();
    await expect(page).toHaveURL(/\/register$/);
  });

  test("successful login redirects away from login", async ({ page }) => {
    await login(page);
    await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
    await expect(page.getByText("BusinessDash").first()).toBeVisible();
  });
});

test.describe("Authentication - Logout", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
  });

  test("can logout from sidebar action", async ({ page }) => {
    await page.getByTestId("nav-logout").click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("can logout from user menu", async ({ page }) => {
    await page.getByTestId("user-menu").click();
    await page.getByText("Log out").click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("redirects back to login after logout when revisiting root", async ({ page }) => {
    await page.getByTestId("nav-logout").click();
    await expect(page).toHaveURL(/\/login$/);

    await page.goto("/");
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe("Authentication - Registration", () => {
  test("shows the registration form", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByTestId("input-register-name")).toBeVisible();
    await expect(page.getByTestId("input-register-email")).toBeVisible();
    await expect(page.getByTestId("input-register-password")).toBeVisible();
    await expect(page.getByTestId("btn-register-submit")).toBeVisible();
    await expect(page.getByTestId("link-login")).toBeVisible();
  });

  test("validates invalid email on registration", async ({ page }) => {
    await page.goto("/register");
    await page.getByTestId("input-register-name").fill("Test User");
    const emailInput = page.getByTestId("input-register-email");
    await emailInput.fill("correo-invalido");
    await page.getByTestId("input-register-password").fill("Password123");
    await page.getByTestId("btn-register-submit").click();

    await expect.poll(() =>
      emailInput.evaluate((element) => (element as HTMLInputElement).checkValidity()),
    ).toBe(false);
    await expect.poll(() =>
      emailInput.evaluate((element) => (element as HTMLInputElement).validationMessage.length),
    ).toBeGreaterThan(0);
  });

  test("validates short name on registration", async ({ page }) => {
    await page.goto("/register");
    await page.getByTestId("input-register-name").fill("A");
    await page.getByTestId("input-register-email").fill("valid@example.com");
    await page.getByTestId("input-register-password").fill("Password123");
    await page.getByTestId("btn-register-submit").click();

    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
  });

  test("navigates back to login from register", async ({ page }) => {
    await page.goto("/register");
    await page.getByTestId("link-login").click();
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe("Authentication - Protected Routes", () => {
  test("redirects guests away from dashboard", async ({ page }) => {
    await page.goto("/users");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("allows authenticated users into protected pages", async ({ page }) => {
    await login(page);
    await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });

    await page.goto("/settings");
    await expect(page).toHaveURL(/\/settings$/);
    await expect(page.getByTestId("btn-toggle-theme")).toBeVisible();
  });
});
