import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hamtarestaurant.at",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://hamtarestaurant.at/impressum",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: "https://hamtarestaurant.at/datenschutz",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
