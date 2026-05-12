import { expect, test } from "@playwright/test";
import { DEFAULT_ROUTE, loginAsStandardUser } from "./support";

test.describe("Customers access control", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("redirects a standard user when opening customers from the sidebar", async ({ page }) => {
    await page.getByTestId("nav-customers").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("redirects a standard user when visiting /customers directly", async ({ page }) => {
    await page.goto("/customers");
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("keeps the products page visible after a denied customers navigation", async ({ page }) => {
    await page.getByTestId("nav-customers").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
    await expect(page.getByRole("table")).toBeVisible();
  });
});
