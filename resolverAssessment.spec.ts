import { test, expect } from "playwright/test";

test.beforeEach(async ({ page }) => {
  //Add correct page URL in 'goto'
  await page.goto(    
    "file:///C:/Users/jainp/OneDrive/Desktop/JobHunt/Resolver/QE-index.html#" 
  );
});

//* Test 1
test("Test 1_Home Page Validation", async ({ page }) => {
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("jdaniels@email.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Welcome@2024");
  const submitButton = await page
    .getByRole("button", { name: "Sign in" })
    .isVisible();
  expect(submitButton).toBeTruthy();
});

//* Test 2
test("Test 2_Verify List Items", async ({ page }) => {
  const test2Card = page.locator("#test-2-div");
  await expect(test2Card.getByRole("listitem")).toHaveCount(3);
  const listItem2 = test2Card.getByRole("listitem").nth(1);
  await expect(listItem2).toHaveText(/List Item 2/);
  await expect(listItem2.getByText("6")).toHaveText(/6/);
});

//* Test 3
test("Test 3_Very Dropdown", async ({ page }) => {
  const test3Card = page.locator("#test-3-div");
  const dropDownButton = test3Card.locator("#dropdownMenuButton");
  await expect(dropDownButton).toHaveText("Option 1");
  await dropDownButton.click();
  await page
    .locator('[aria-labelledby = "dropdownMenuButton"]')
    .locator("a")
    .filter({ hasText: "Option 3" })
    .click();
  await expect(dropDownButton).toHaveText("Option 3");
});

//* Test 4
test("Test 4_Verify Buttons", async ({ page }) => {
  const test4Card = page.locator("#test-4-div");
  const firstButton = await test4Card
    .getByRole("button", { name: "Button" })
    .nth(0)
    .isEnabled();
  expect(firstButton).toBeTruthy();
  const secondButton = await test4Card
    .getByRole("button", { name: "Button" })
    .nth(1)
    .isDisabled();
  expect(secondButton).toBeTruthy();
});

//* Test 5
test("Test 5_Verify Button Click", async ({ page }) => {
  const test5Card = page.locator("#test-5-div");
  const test5Button = test5Card.getByRole("button", { name: "Button" });
  await test5Button.click();
  const alertMessage = await page.locator("#test5-alert").textContent();
  expect(alertMessage).toMatch(/You clicked a button!/);
  const test5ButtonStatus = await test5Button.isDisabled();
  expect(test5ButtonStatus).toBeTruthy();
});

//* Test 6
test("Test 6_Verify Web Table", async ({ page }) => {
  const test6Card = page.locator("#test-6-div");
  const firstRowColumn1 = await test6Card
    .getByRole("table")
    .locator("td", { hasText: "brietta" })
    .textContent();
  expect(firstRowColumn1).toEqual("Brietta");
  const dataOn2and2 = await test6Card
    .getByRole("table")
    .locator("td", { hasText: "ventosanzap" })
    .textContent();
  expect(dataOn2and2).toEqual("Ventosanzap");
});
