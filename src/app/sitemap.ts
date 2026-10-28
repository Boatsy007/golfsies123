import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const paths = ["", "/how-it-works", "/membership", "/tournaments", "/claim", "/partners", "/faq", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path === "/claim" ? 0.9 : 0.7,
  }));
}
