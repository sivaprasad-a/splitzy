import { test, expect } from "@playwright/test";

test("home page shows the Splitzy heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Splitzy" })).toBeVisible();
});
