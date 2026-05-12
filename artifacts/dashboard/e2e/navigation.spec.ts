import { expect, test } from "@playwright/test";
import { DEFAULT_ROUTE, loginAsStandardUser } from "./support";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("navigates to Products page", async ({ page }) => {
    await page.getByTestId("nav-products").click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  });

  test("navigates to Settings page", async ({ page }) => {
    await page.getByTestId("nav-settings").click();
    await expect(page).toHaveURL(/\/settings$/);
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  });

  test("navigates to Dashboard home", async ({ page }) => {
    await page.getByTestId("nav-dashboard").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });

  test("redirects back to default route when opening Customers without permission", async ({ page }) => {
    await page.getByTestId("nav-customers").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("redirects back to default route when opening Users without permission", async ({ page }) => {
    await page.getByTestId("nav-users").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("redirects back to default route when opening Posts without permission", async ({ page }) => {
    await page.getByTestId("nav-posts").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });
});

test.describe("Dashboard Layout", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("displays sidebar and navigation items", async ({ page }) => {
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("nav-dashboard")).toBeVisible();
    await expect(page.getByTestId("nav-products")).toBeVisible();
    await expect(page.getByTestId("nav-customers")).toBeVisible();
    await expect(page.getByTestId("nav-posts")).toBeVisible();
    await expect(page.getByTestId("nav-settings")).toBeVisible();
  });

  test("displays user menu in header", async ({ page }) => {
    await expect(page.getByTestId("user-menu")).toBeVisible();
  });

  test("can open user menu and logout", async ({ page }) => {
    await page.getByTestId("user-menu").click();
    await page.getByText("Log out").click();
    await expect(page).toHaveURL(/\/login$/);
  });
});

test.describe("Responsive Navigation", () => {
  test("mobile menu toggle is visible after login", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsStandardUser(page);
    await expect(page.getByTestId("mobile-menu-toggle")).toBeVisible();
  });
});
