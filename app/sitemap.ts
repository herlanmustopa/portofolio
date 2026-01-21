import { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/sanity/queries";

const locales = ["id", "en"];
const baseUrl = "https://www.herlanmustopa.com";

// Static pages with their sections
const staticPages = [
  { path: "", priority: 1, changeFreq: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFreq: "daily" as const },
  { path: "/#expertise", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/#projects", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/#about", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/#article", priority: 0.8, changeFreq: "weekly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog post slugs
  const slugs = await getAllArticleSlugs();

  // Generate locale-specific static pages
  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFreq,
      priority: locale === "id" ? page.priority : page.priority * 0.9,
      alternates: {
        languages: {
          id: `${baseUrl}/id${page.path}`,
          en: `${baseUrl}/en${page.path}`,
        },
      },
    }))
  );

  // Generate locale-specific blog post URLs
  const blogUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    slugs.map((slug: string) => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          id: `${baseUrl}/id/blog/${slug}`,
          en: `${baseUrl}/en/blog/${slug}`,
        },
      },
    }))
  );

  return [...staticUrls, ...blogUrls];
}
