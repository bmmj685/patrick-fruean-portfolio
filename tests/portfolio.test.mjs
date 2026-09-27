import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root));

test("the downloadable CV is byte-identical to the preserved original", async () => {
  const [original, download] = await Promise.all([
    read("Patrick_Fruean_CV_2026_Updated.docx"),
    read("public/documents/Patrick_Fruean_CV_2026_Updated.docx"),
  ]);
  const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
  assert.equal(digest(download), digest(original));
});

test("portfolio data contains the five documented projects", async () => {
  const source = await read("src/data/portfolio.ts").then(String);
  const slugs = [
    "fsc-sports-facility-booking",
    "zero-tech",
    "distributed-java-rmi",
    "network-engineering-labs",
    "car-rental-booking-concept",
  ];
  slugs.forEach((slug) => assert.match(source, new RegExp(`slug: "${slug}"`)));
});

test("contact workflow is transparent and uses the CV email", async () => {
  const [data, form] = await Promise.all([
    read("src/data/portfolio.ts").then(String),
    read("src/components/ContactForm.tsx").then(String),
  ]);
  assert.match(data, /patrickfruean\.dev@gmail\.com/);
  assert.match(form, /does not transmit or store/i);
  assert.match(form, /mailto:/);
});

test("SEO and accessibility metadata routes are present", async () => {
  const files = await Promise.all([
    read("src/app/robots.ts"),
    read("src/app/sitemap.ts"),
    read("src/app/opengraph-image.tsx"),
    read("src/app/icon.svg"),
  ]);
  files.forEach((file) => assert.ok(file.byteLength > 0));
});
