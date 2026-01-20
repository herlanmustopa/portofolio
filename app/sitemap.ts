import { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://herlanmustopa.com";

  // Get all blog post slugs
  const slugs = await getAllArticleSlugs();

  // Generate blog post URLs
  const blogUrls = slugs.map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  return [...staticPages, ...blogUrls];
}
