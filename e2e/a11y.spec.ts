import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has no detectable accessibility violations", async ({ page }) => {
  await page.goto("/");
  // Scroll through so every scroll-triggered section has rendered.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} × ${v.help}\n    e.g. ${v.nodes[0]?.target.join(" ")}`);
  expect(summary, summary.join("\n")).toEqual([]);
});
