import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows the hero and the page title", async ({ page }) => {
  await expect(page).toHaveTitle(/Golfsies/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("3 Clubs.");
  await expect(page.getByRole("link", { name: /Claim your team name/ }).first()).toBeVisible();
});

test("loads without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (err) => errors.push(err.message));
  await page.reload();
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("has no horizontal scrolling", async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("every in-page link points at a section that exists", async ({ page }) => {
  const hrefs = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
  for (const href of new Set(hrefs)) {
    await expect(page.locator(href), `missing target for ${href}`).toHaveCount(1);
  }
});

test("shows the founding spots counter and plans", async ({ page }) => {
  await expect(page.getByTestId("spots-text")).toHaveText(/\d+ of \d+ Founding spots left/);
  await expect(page.getByRole("heading", { name: "Team Membership" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tournament Entry" })).toBeVisible();
});

test("filters the news feed", async ({ page }) => {
  const feed = page.getByTestId("news-feed").locator("li");
  const all = await feed.count();
  await page.getByRole("button", { name: "Venues" }).click();
  await expect(feed).toHaveCount(1);
  await expect(feed.first()).toContainText("venue");
  await page.getByRole("button", { name: "All" }).click();
  await expect(feed).toHaveCount(all);
});

test("opens an FAQ answer", async ({ page }) => {
  const answer = page.getByText("Reserving a Founding Team name is free.");
  await expect(answer).toBeHidden();
  await page.getByText("Do I pay anything now?").click();
  await expect(answer).toBeVisible();
});

test.describe("claim form", () => {
  test("asks for the required details in order", async ({ page }) => {
    const submit = page.getByRole("button", { name: /Claim our name/ });
    const alert = page.locator("#register").getByRole("alert");

    await submit.click();
    await expect(alert).toHaveText(/team name you want to claim/);

    await page.getByLabel("Team name you want to claim").fill("Test Bears");
    await submit.click();
    await expect(alert).toHaveText(/owner's name, mobile and email/);

    await page.getByLabel("Team owner's name").fill("Sam");
    await page.getByLabel("Mobile").fill("0400 000 000");
    await page.getByLabel(/^Email/).fill("not-an-email");
    await submit.click();
    await expect(alert).toHaveText(/email doesn't look quite right/);

    await page.getByLabel(/^Email/).fill("sam@example.com");
    await submit.click();
    await expect(alert).toHaveText(/tick the box/);
  });

  test("shows the confirmation once everything is filled in", async ({ page }) => {
    // If a real form endpoint is configured, answer it locally so tests never send a claim.
    await page.route(/formspree|getform|basin/, (route) => route.fulfill({ status: 200, body: "{}" }));

    await page.getByLabel("Team name you want to claim").fill("Test Bears");
    await page.getByLabel("Team owner's name").fill("Sam");
    await page.getByLabel("Mobile").fill("0400 000 000");
    await page.getByLabel(/^Email/).fill("sam@example.com");
    await page.getByLabel(/I understand this reserves my team name/).check();
    await page.getByRole("button", { name: /Claim our name/ }).click();

    await expect(page.getByRole("status")).toContainText("Name request received!");
  });
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu button only shows on small screens");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Tournaments" }).click();
  await expect(menu).toBeHidden();
});
