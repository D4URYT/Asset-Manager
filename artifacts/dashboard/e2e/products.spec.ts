import { expect, test } from "@playwright/test";
import { loginAsStandardUser } from "./support";

test.describe("Products Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await page.getByTestId("nav-products").click();
    await expect(page).toHaveURL(/\/products$/);
  });

  test("displays products table with data", async ({ page }) => {
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByRole("row").nth(1)).toBeVisible();
  });

  test("displays product column headers", async ({ page }) => {
    await expect(page.getByRole("columnheader", { name: "Product Name" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Category" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Price" })).toBeVisible();
  });

  test("can search products", async ({ page }) => {
    const searchInput = page.getByTestId("input-search-products");
    await searchInput.fill("Analytics");
    await expect(page.getByRole("row", { name: /Analytics Dashboard/i })).toBeVisible();
  });

  test("can open create product form", async ({ page }) => {
    await page.getByTestId("btn-create-product").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Create Product" })).toBeVisible();
  });

  test("shows validation errors on invalid form submission", async ({ page }) => {
    await page.getByTestId("btn-create-product").click();
    await page.getByRole("button", { name: "Create Product" }).last().click();
    await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
    await expect(page.getByText("Category is required")).toBeVisible();
  });
});
