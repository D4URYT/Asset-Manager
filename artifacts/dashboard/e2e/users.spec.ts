import { expect, test } from "@playwright/test";
import { DEFAULT_ROUTE, loginAsStandardUser } from "./support";

test.describe("Users access control", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("redirects a standard user when opening users from the sidebar", async ({ page }) => {
    await page.getByTestId("nav-users").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("redirects a standard user when visiting /users directly", async ({ page }) => {
    await page.goto("/users");
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("keeps accessible navigation available after denied users access", async ({ page }) => {
    await page.getByTestId("nav-users").click();
    await expect(page.getByTestId("nav-products")).toBeVisible();
    await expect(page.getByTestId("nav-settings")).toBeVisible();
  });
});
