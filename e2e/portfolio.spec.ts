import { expect, test } from "@playwright/test";

const viewports = [
  { width: 320, height: 720 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

async function revealWholePage(page: import("@playwright/test").Page) {
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  for (let y = 0; y < scrollHeight; y += Math.max(300, viewportHeight * 0.65)) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(35);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test("homepage is responsive across every requested viewport", async ({ page }, testInfo) => {
  const browserErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Patrick Fruean/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Projects built around real problems/i })).toBeAttached();
    await expect(page.locator(".hero-visual")).toBeVisible();
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(dimensions.scrollWidth, `horizontal overflow at ${viewport.width}px`).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await revealWholePage(page);
  await page.screenshot({ path: testInfo.outputPath("homepage-mobile-390.png"), fullPage: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await revealWholePage(page);
  await page.screenshot({ path: testInfo.outputPath("homepage-desktop-1440.png"), fullPage: true });
  expect(browserErrors).toEqual([]);
});

test("mobile menu opens, navigates, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation menu" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Close navigation menu" })).toBeVisible();
  await page.locator("#mobile-menu").getByRole("link", { name: /Contact/ }).click();
  await expect(page.locator("#contact")).toBeInViewport();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
});

test("project filters and case-study routes work", async ({ page }) => {
  await page.goto("/#projects");
  await page.getByRole("button", { name: "Networking", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Network Engineering Labs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Zero Tech" })).toBeHidden();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("link", { name: "Explore case study" }).first().click();
  await expect(page).toHaveURL(/\/projects\/fsc-sports-facility-booking$/);
  await expect(page.getByRole("heading", { name: "FSC Sports Facility Booking System" })).toBeVisible();
  await expect(page.getByText("Understanding the problem")).toBeVisible();
});

test("contact form exposes useful validation and a truthful delivery notice", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.locator(".field-error")).toHaveCount(4);
  await expect(page.getByText(/does not transmit or store/i)).toBeVisible();
  await page.getByLabel("Name").fill("Test Visitor");
  await page.getByLabel("Email").fill("visitor@example.com");
  await page.getByLabel("Subject").fill("Project discussion");
  await page.getByLabel("Message").fill("I would like to discuss a software project with you.");
  await expect(page.locator("[aria-invalid='true']")).toHaveCount(0);
});

test("the original CV downloads with its expected filename", async ({ page }) => {
  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download CV" }).first().click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Patrick_Fruean_CV_2026_Updated.docx");
});
