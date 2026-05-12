import { expect, test } from "@playwright/test";
import { loginAsStandardUser } from "./support";

test.describe("Settings Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
    await page.getByTestId("nav-settings").click();
    await expect(page).toHaveURL(/\/settings$/);
  });

  test("displays settings sections", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
    await expect(page.getByText("Profile").first()).toBeVisible();
    await expect(page.getByText("Appearance").first()).toBeVisible();
  });

  test("shows the current profile information", async ({ page }) => {
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#role")).toBeVisible();
  });

  test("shows the dark mode switch", async ({ page }) => {
    await expect(page.getByTestId("switch-dark-mode")).toBeVisible();
  });

  test("can toggle dark mode", async ({ page }) => {
    const themeToggle = page.getByTestId("switch-dark-mode");
    const before = await themeToggle.getAttribute("data-state");
    await themeToggle.click();
    const after = await themeToggle.getAttribute("data-state");
    expect(before).not.toBe(after);
  });

  test("shows save changes button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Save changes" })).toBeVisible();
  });
});
