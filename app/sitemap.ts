import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const serviceUrls: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}${s.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceUrls,
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
