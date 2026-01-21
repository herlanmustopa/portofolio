import { MetadataRoute } from "next";
import { getAllArticleSlugs } from "@/sanity/queries";

const locales = ["id", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://herlanmustopa.com";

  // Get all blog post slugs
  const slugs = await getAllArticleSlugs();

  // Generate locale-specific home and blog pages
  const localePages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: locale === "id" ? 1 : 0.9,
      alternates: {
        languages: {
          id: `${baseUrl}/id`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
      alternates: {
        languages: {
          id: `${baseUrl}/id/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    },
  ]);

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

  return [...localePages, ...blogUrls];
}
