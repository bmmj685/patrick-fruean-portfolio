import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.example").replace(/\/$/, "");
  const routes = ["", ...projects.map((project) => `/projects/${project.slug}`)];
  return routes.map((route) => ({ url: `${base}${route}`, changeFrequency: route ? "monthly" : "weekly", priority: route ? 0.8 : 1 }));
}
