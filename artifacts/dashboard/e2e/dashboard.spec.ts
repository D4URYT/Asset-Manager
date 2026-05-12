import { expect, test } from "@playwright/test";
import { DEFAULT_ROUTE, loginAsStandardUser } from "./support";

test.describe("Dashboard home", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await page.getByTestId("nav-dashboard").click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("displays dashboard heading and summary cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByTestId("stat-users")).toBeVisible();
    await expect(page.getByTestId("stat-products")).toBeVisible();
  });

  test("renders at least one chart SVG element", async ({ page }) => {
    await expect(page.locator("svg").first()).toBeVisible();
  });

  test("sidebar navigation items are visible", async ({ page }) => {
    await expect(page.getByTestId("nav-dashboard")).toBeVisible();
    await expect(page.getByTestId("nav-products")).toBeVisible();
    await expect(page.getByTestId("nav-settings")).toBeVisible();
  });
});

test.describe("Products page", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await page.getByTestId("nav-products").click();
    await expect(page).toHaveURL(/\/products$/);
  });

  test("shows the products data table", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible();
  });

  test("has an Add Product button", async ({ page }) => {
    await expect(page.getByTestId("btn-create-product")).toBeVisible();
  });

  test("search input is visible", async ({ page }) => {
    await expect(page.getByTestId("input-search-products")).toBeVisible();
  });
});

test.describe("Restricted routes", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("redirects users away from Customers page", async ({ page }) => {
    await page.getByTestId("nav-customers").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("redirects users away from Posts page", async ({ page }) => {
    await page.getByTestId("nav-posts").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("allows navigation to Settings page", async ({ page }) => {
    await page.getByTestId("nav-settings").click();
    await expect(page).toHaveURL(/\/settings$/);
  });

  test("logout via nav button redirects to login", async ({ page }) => {
    await page.getByTestId("nav-logout").click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("logout via user menu redirects to login", async ({ page }) => {
    await page.getByTestId("user-menu").click();
    await page.getByText("Log out").click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
