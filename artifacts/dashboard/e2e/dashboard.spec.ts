import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = "admin@empresa.com";
const ADMIN_PASSWORD = "admin123";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(login)?$/, { timeout: 8000 });
  await page.locator('[data-testid="input-login-email"]').fill(ADMIN_EMAIL);
  await page.locator('[data-testid="input-login-password"]').fill(ADMIN_PASSWORD);
  await page.locator('[data-testid="btn-login-submit"]').click();
  await expect(page).not.toHaveURL(/\/login/, { timeout: 10000 });
}

// ---------------------------------------------------------------------------
// Dashboard home
// ---------------------------------------------------------------------------
test.describe("Dashboard home", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("displays KPI stats text on the page", async ({ page }) => {
    await expect(
      page.getByText(/total users|total products|total revenue|customers/i).first(),
    ).toBeVisible({ timeout: 8000 });
  });

  test("renders at least one chart SVG element", async ({ page }) => {
    // Wait for data to load then check for any SVG (Recharts uses svg elements)
    await page.waitForTimeout(2000);
    const svg = page.locator("svg").first();
    await expect(svg).toBeVisible({ timeout: 8000 });
  });

  test("sidebar navigation items are visible", async ({ page }) => {
    await expect(page.locator('[data-testid="nav-dashboard"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-testid="nav-users"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-products"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-customers"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-posts"]')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Users page
// ---------------------------------------------------------------------------
test.describe("Users page", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.locator('[data-testid="nav-users"]').click();
    await expect(page).toHaveURL(/\/users/, { timeout: 5000 });
    await page.waitForTimeout(1500);
  });

  test("shows the users data table", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible({ timeout: 8000 });
  });

  test("shows at least one data row (seeded users)", async ({ page }) => {
    // Wait for data loading
    await expect(page.getByRole("row").nth(1)).toBeVisible({ timeout: 8000 });
  });

  test("has an Add User button", async ({ page }) => {
    await expect(page.locator('[data-testid="btn-create-user"]')).toBeVisible({ timeout: 5000 });
  });

  test("search input is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="input-search-users"]')).toBeVisible({ timeout: 5000 });
  });
});

// ---------------------------------------------------------------------------
// Products page
// ---------------------------------------------------------------------------
test.describe("Products page", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.locator('[data-testid="nav-products"]').click();
    await expect(page).toHaveURL(/\/products/, { timeout: 5000 });
    await page.waitForTimeout(1500);
  });

  test("shows the products data table", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible({ timeout: 8000 });
  });

  test("has an Add Product button", async ({ page }) => {
    await expect(page.locator('[data-testid="btn-create-product"]')).toBeVisible({ timeout: 5000 });
  });

  test("search input is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="input-search-products"]')).toBeVisible({ timeout: 5000 });
  });
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("can navigate to Customers page", async ({ page }) => {
    await page.locator('[data-testid="nav-customers"]').click();
    await expect(page).toHaveURL(/\/customers/, { timeout: 5000 });
  });

  test("can navigate to Posts page", async ({ page }) => {
    await page.locator('[data-testid="nav-posts"]').click();
    await expect(page).toHaveURL(/\/posts/, { timeout: 5000 });
  });

  test("can navigate to Settings page", async ({ page }) => {
    await page.locator('[data-testid="nav-settings"]').click();
    await expect(page).toHaveURL(/\/settings/, { timeout: 5000 });
  });

  test("logout via nav button redirects to login", async ({ page }) => {
    await page.locator('[data-testid="nav-logout"]').click();
    await expect(page).toHaveURL(/\/(login)?$/, { timeout: 8000 });
  });

  test("logout via user menu redirects to login", async ({ page }) => {
    await page.locator('[data-testid="user-menu"]').click();
    await page.getByText("Log out").click();
    await expect(page).toHaveURL(/\/(login)?$/, { timeout: 8000 });
  });
});
