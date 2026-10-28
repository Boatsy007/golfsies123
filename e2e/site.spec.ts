import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const { path, h1 } of pages) {
  test.describe(`page ${path}`, () => {
    test("loads with its heading, no browser errors and no sideways scrolling", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
      page.on("pageerror", (err) => errors.push(err.message));

      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "page is wider than the screen").toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });

    test("every internal link resolves", async ({ page, request }) => {
      await page.goto(path);
      const hrefs = await page.locator('a[href^="/"], a[href^="#"]').evaluateAll((links) => links.map((a) => a.getAttribute("href")!));
      for (const href of new Set(hrefs)) {
        if (href.startsWith("#")) {
          await expect(page.locator(href), `missing in-page target ${href}`).toHaveCount(1);
          continue;
        }
        const [pathname, hash] = href.split("#");
        const res = await request.get(pathname);
        expect(res.status(), `broken link ${href} on ${path}`).toBe(200);
        if (hash) {
          const target = await page.context().newPage();
          await target.goto(href);
          await expect(target.locator(`#${hash}`), `missing target #${hash} on ${pathname}`).toHaveCount(1);
          await target.close();
        }
      }
    });
  });
}

test("unknown pages show the branded 404", async ({ page }) => {
  const res = await page.goto("/this-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Lost ball.");
  await page.getByRole("link", { name: /Back to home/ }).click();
  await expect(page).toHaveURL("/");
});

test("main navigation reaches every section and marks the current page", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop navigation only");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  for (const label of ["How it works", "Membership", "Tournaments", "Partners", "FAQ"]) {
    await nav.getByRole("link", { name: label }).click();
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
  }
  await nav.getByRole("link", { name: "Claim your team" }).click();
  await expect(page).toHaveURL("/claim");
});

test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "menu button only shows on small screens");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();

  await page.getByRole("button", { name: "Open menu" }).click();
  await menu.getByRole("link", { name: "Tournaments" }).click();
  await expect(page).toHaveURL("/tournaments");
  await expect(menu).toBeHidden();
});

test("announcement bar can be dismissed and is hidden on the claim page", async ({ page }) => {
  await page.goto("/");
  const bar = page.getByRole("region", { name: "Announcement" });
  await expect(bar).toBeVisible();
  await bar.getByRole("button", { name: "Dismiss announcement" }).click();
  await expect(bar).toBeHidden();
  await page.goto("/claim");
  await expect(page.getByRole("region", { name: "Announcement" })).toHaveCount(0);
});

test("FAQ answers open and close", async ({ page }) => {
  await page.goto("/faq");
  const answer = page.getByText("Reserving a Founding Team name is free.");
  await expect(answer).toBeHidden();
  await page.getByText("Do I pay anything now?").click();
  await expect(answer).toBeVisible();
});
