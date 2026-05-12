# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-extended.spec.ts >> Authentication - Login >> validates invalid email format
- Location: e2e\auth-extended.spec.ts:29:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('input-login-email')
    - locator resolved to <input value="" type="email" name="email" id="«r0»-form-item" aria-invalid="false" placeholder="name@example.com" data-testid="input-login-email" aria-describedby="«r0»-form-item-description" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disab…/>
    - fill("correo-invalido")
  - attempting fill action
    - waiting for element to be visible, enabled and editable

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: BusinessDash
      - generic [ref=e7]: Enter your credentials to sign in to your account
    - generic [ref=e8]:
      - generic [ref=e9]:
        - generic [ref=e10]:
          - text: Email
          - textbox "Email" [ref=e11]:
            - /placeholder: name@example.com
        - generic [ref=e12]:
          - text: Password
          - textbox "Password" [ref=e13]:
            - /placeholder: ••••••••
        - button "Sign in" [ref=e14]
      - generic [ref=e15]:
        - text: Don't have an account?
        - link "Sign up" [ref=e16] [cursor=pointer]:
          - /url: /register
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | 
  3   | const ADMIN_EMAIL = "elwilcraft@gmail.com";
  4   | const ADMIN_PASSWORD = "123456";
  5   | 
  6   | async function login(page: Page, email = ADMIN_EMAIL, password = ADMIN_PASSWORD) {
  7   |   await page.goto("/");
  8   |   await expect(page).toHaveURL(/\/login$/);
  9   |   await page.getByTestId("input-login-email").fill(email);
  10  |   await page.getByTestId("input-login-password").fill(password);
  11  |   await page.getByTestId("btn-login-submit").click();
  12  | }
  13  | 
  14  | test.describe("Authentication - Login", () => {
  15  |   test("redirects unauthenticated users from root to login", async ({ page }) => {
  16  |     await page.goto("/");
  17  |     await expect(page).toHaveURL(/\/login$/);
  18  |     await expect(page.getByText("BusinessDash")).toBeVisible();
  19  |   });
  20  | 
  21  |   test("shows the login form fields", async ({ page }) => {
  22  |     await page.goto("/login");
  23  |     await expect(page.getByTestId("input-login-email")).toBeVisible();
  24  |     await expect(page.getByTestId("input-login-password")).toBeVisible();
  25  |     await expect(page.getByTestId("btn-login-submit")).toBeVisible();
  26  |     await expect(page.getByTestId("link-register")).toBeVisible();
  27  |   });
  28  | 
  29  |   test("validates invalid email format", async ({ page }) => {
  30  |     await page.goto("/login");
  31  |     const emailInput = page.getByTestId("input-login-email");
> 32  |     await emailInput.fill("correo-invalido");
      |                      ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  33  |     await page.getByTestId("input-login-password").fill("123456");
  34  |     await page.getByTestId("btn-login-submit").click();
  35  | 
  36  |     await expect.poll(() =>
  37  |       emailInput.evaluate((element) => (element as HTMLInputElement).checkValidity()),
  38  |     ).toBe(false);
  39  |     await expect.poll(() =>
  40  |       emailInput.evaluate((element) => (element as HTMLInputElement).validationMessage.length),
  41  |     ).toBeGreaterThan(0);
  42  |   });
  43  | 
  44  |   test("validates missing password", async ({ page }) => {
  45  |     await page.goto("/login");
  46  |     await page.getByTestId("input-login-email").fill(ADMIN_EMAIL);
  47  |     await page.getByTestId("btn-login-submit").click();
  48  | 
  49  |     await expect(page.getByText("Password must be at least 6 characters")).toBeVisible();
  50  |   });
  51  | 
  52  |   test("navigates to register page from login", async ({ page }) => {
  53  |     await page.goto("/login");
  54  |     await page.getByTestId("link-register").click();
  55  |     await expect(page).toHaveURL(/\/register$/);
  56  |   });
  57  | 
  58  |   test("successful login redirects away from login", async ({ page }) => {
  59  |     await login(page);
  60  |     await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
  61  |     await expect(page.getByText("BusinessDash").first()).toBeVisible();
  62  |   });
  63  | });
  64  | 
  65  | test.describe("Authentication - Logout", () => {
  66  |   test.beforeEach(async ({ page }) => {
  67  |     await login(page);
  68  |     await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
  69  |   });
  70  | 
  71  |   test("can logout from sidebar action", async ({ page }) => {
  72  |     await page.getByTestId("nav-logout").click();
  73  |     await expect(page).toHaveURL(/\/login$/);
  74  |   });
  75  | 
  76  |   test("can logout from user menu", async ({ page }) => {
  77  |     await page.getByTestId("user-menu").click();
  78  |     await page.getByText("Log out").click();
  79  |     await expect(page).toHaveURL(/\/login$/);
  80  |   });
  81  | 
  82  |   test("redirects back to login after logout when revisiting root", async ({ page }) => {
  83  |     await page.getByTestId("nav-logout").click();
  84  |     await expect(page).toHaveURL(/\/login$/);
  85  | 
  86  |     await page.goto("/");
  87  |     await expect(page).toHaveURL(/\/login$/);
  88  |   });
  89  | });
  90  | 
  91  | test.describe("Authentication - Registration", () => {
  92  |   test("shows the registration form", async ({ page }) => {
  93  |     await page.goto("/register");
  94  |     await expect(page.getByTestId("input-register-name")).toBeVisible();
  95  |     await expect(page.getByTestId("input-register-email")).toBeVisible();
  96  |     await expect(page.getByTestId("input-register-password")).toBeVisible();
  97  |     await expect(page.getByTestId("btn-register-submit")).toBeVisible();
  98  |     await expect(page.getByTestId("link-login")).toBeVisible();
  99  |   });
  100 | 
  101 |   test("validates invalid email on registration", async ({ page }) => {
  102 |     await page.goto("/register");
  103 |     await page.getByTestId("input-register-name").fill("Test User");
  104 |     const emailInput = page.getByTestId("input-register-email");
  105 |     await emailInput.fill("correo-invalido");
  106 |     await page.getByTestId("input-register-password").fill("Password123");
  107 |     await page.getByTestId("btn-register-submit").click();
  108 | 
  109 |     await expect.poll(() =>
  110 |       emailInput.evaluate((element) => (element as HTMLInputElement).checkValidity()),
  111 |     ).toBe(false);
  112 |     await expect.poll(() =>
  113 |       emailInput.evaluate((element) => (element as HTMLInputElement).validationMessage.length),
  114 |     ).toBeGreaterThan(0);
  115 |   });
  116 | 
  117 |   test("validates short name on registration", async ({ page }) => {
  118 |     await page.goto("/register");
  119 |     await page.getByTestId("input-register-name").fill("A");
  120 |     await page.getByTestId("input-register-email").fill("valid@example.com");
  121 |     await page.getByTestId("input-register-password").fill("Password123");
  122 |     await page.getByTestId("btn-register-submit").click();
  123 | 
  124 |     await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
  125 |   });
  126 | 
  127 |   test("navigates back to login from register", async ({ page }) => {
  128 |     await page.goto("/register");
  129 |     await page.getByTestId("link-login").click();
  130 |     await expect(page).toHaveURL(/\/login$/);
  131 |   });
  132 | });
```