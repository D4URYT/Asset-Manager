import { expect, test } from "@playwright/test";
import { DEFAULT_ROUTE, loginAsStandardUser } from "./support";

test.describe("Posts access control", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test("redirects a standard user when opening posts from the sidebar", async ({ page }) => {
    await page.getByTestId("nav-posts").click();
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("redirects a standard user when visiting /posts directly", async ({ page }) => {
    await page.goto("/posts");
    await expect(page).toHaveURL(new RegExp(`${DEFAULT_ROUTE}$`));
  });

  test("stays on products after denied posts access", async ({ page }) => {
    await page.getByTestId("nav-posts").click();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  });
});
