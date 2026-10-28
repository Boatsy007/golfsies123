import { expect, test, type Page } from "@playwright/test";

// The server ignores submissions made faster than a human could, as spam.
const waitLikeAHuman = (page: Page) => page.waitForTimeout(2100);

test.describe("claim a team name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/claim");
  });

  test("shows server-side errors inline, keeps what was typed and focuses the first problem", async ({ page }) => {
    await page.getByLabel(/Team name you want to claim/).fill("Test Bears");
    await page.getByLabel(/^Mobile/).fill("12345");
    await page.getByLabel(/^Email/).fill("not-an-email");
    await page.getByRole("button", { name: /Claim our name/ }).click();

    await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
    await expect(page.getByText("Add the team owner's name.")).toBeVisible();
    await expect(page.getByText(/Enter an Australian mobile number/)).toBeVisible();
    await expect(page.getByText(/Enter a valid email address/)).toBeVisible();
    await expect(page.getByText(/Tick the box to confirm/)).toBeVisible();

    // What the visitor typed is still there, and the first broken field has focus.
    await expect(page.getByLabel(/Team name you want to claim/)).toHaveValue("Test Bears");
    await expect(page.getByLabel(/Team owner's name/)).toBeFocused();
    await expect(page.getByLabel(/Team owner's name/)).toHaveAttribute("aria-invalid", "true");
  });

  test("asks the visitor to resend a complete form sent too quickly", async ({ page }) => {
    await page.getByLabel(/Team name you want to claim/).fill("Speedy Team");
    await page.getByLabel(/Team owner's name/).fill("Sam Smith");
    await page.getByLabel(/^Mobile/).fill("0412 345 678");
    await page.getByLabel(/^Email/).fill("sam@example.com");
    await page.getByLabel(/I understand this reserves my team name/).check();
    await page.getByRole("button", { name: /Claim our name/ }).click();

    await expect(page.getByText(/That was quick!/)).toBeVisible();
    await expect(page.getByLabel(/Team name you want to claim/)).toHaveValue("Speedy Team");
    await expect(page.getByLabel(/I understand this reserves my team name/)).toBeChecked();

    // Sending it again, after a moment to read the message, goes through.
    await waitLikeAHuman(page);
    await page.getByRole("button", { name: /Claim our name/ }).click();
    await expect(page.getByRole("status")).toContainText("Name request received");
  });

  test("submits a complete claim and confirms it", async ({ page }) => {
    await page.getByLabel(/Team name you want to claim/).fill("Test Bears");
    await page.getByLabel(/Team owner's name/).fill("Sam Smith");
    await page.getByLabel(/^Mobile/).fill("0412 345 678");
    await page.getByLabel(/^Email/).fill("sam@example.com");
    await page.getByRole("checkbox", { name: "Weeknight twilight" }).check();
    await page.getByRole("checkbox", { name: "Weekend arvo" }).check();
    await page.getByLabel(/I understand this reserves my team name/).check();
    await waitLikeAHuman(page);

    const submit = page.getByRole("button", { name: /Claim our name/ });
    await submit.click();

    const confirmation = page.getByRole("status");
    await expect(confirmation).toContainText("Name request received");
    await expect(confirmation).toContainText("Test Bears");
    await expect(page.getByRole("heading", { name: "Name request received" })).toBeFocused();
  });
});

test.describe("partner enquiry", () => {
  test("a 'Talk about…' link preselects the enquiry type", async ({ page }) => {
    await page.goto("/partners");
    await page.getByRole("link", { name: /Talk about sponsorship/ }).click();
    await expect(page.getByRole("radio", { name: "Sponsor the league" })).toBeChecked();
  });

  test("validates, then sends a complete enquiry", async ({ page }) => {
    await page.goto("/partners#enquire-venue");
    await expect(page.getByRole("radio", { name: "Host a tournament" })).toBeChecked();

    const submit = page.getByRole("button", { name: /Send enquiry/ });
    await submit.click();
    await expect(page.getByText("Add your name.")).toBeVisible();
    await expect(page.getByText("Tell us a little about what you have in mind.")).toBeVisible();
    await expect(page.getByRole("radio", { name: "Host a tournament" })).toBeChecked();

    await page.getByLabel(/Your name/).fill("Alex Green");
    await page.getByLabel(/Venue, business or company/).fill("Robina Par 3");
    await page.getByLabel(/^Email/).fill("alex@example.com");
    await page.getByLabel(/What do you have in mind/).fill("We have quiet Tuesday evenings and nine short holes.");
    await waitLikeAHuman(page);
    await submit.click();

    await expect(page.getByRole("status")).toContainText("Thanks, we'll be in touch");
  });
});
