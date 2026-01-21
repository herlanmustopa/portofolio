import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import HomeClient from "@/components/templates/HomeClient";
import { getArticles } from "@/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIndonesian = locale === "id";

  const title = "Herlan Mustopa | Fullstack Developer & Software Engineer";
  const description = isIndonesian
    ? "Portfolio Herlan Mustopa - Fullstack Developer & Software Engineer yang spesialis dalam React, Next.js, dan teknologi web modern. Meningkatkan setiap interaksi melampaui ekspektasi."
    : "Portfolio of Herlan Mustopa - Fullstack Developer & Software Engineer specializing in React, Next.js, and modern web technologies. Elevating every interaction beyond expectation.";

  return {
    title,
    description,
    keywords: [
      "Fullstack Developer",
      "Software Engineer",
      "Product Engineer",
      "Frontend Developer",
      "Backend Developer",
      "React Developer",
      "Next.js",
      "Web Developer",
      "Herlan Mustopa",
      "Portfolio",
    ],
    authors: [{ name: "Herlan Mustopa" }],
    creator: "Herlan Mustopa",
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: `https://www.herlanmustopa.com/${locale}`,
      siteName: "Herlan Mustopa Portfolio",
      title,
      description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Herlan Mustopa Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// JSON-LD structured data for the homepage
function generateJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Herlan Mustopa",
    url: "https://www.herlanmustopa.com",
    jobTitle: ["Fullstack Developer", "Software Engineer", "Product Engineer"],
    description:
      "Fullstack Developer & Software Engineer specializing in React, Next.js, and modern web technologies",
    sameAs: [
      "https://github.com/herlanmustopa",
      "https://linkedin.com/in/herlanmustopa",
    ],
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Fetch articles server-side for SSR
  const articles = await getArticles();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(locale)),
        }}
      />
      <HomeClient articles={articles} />
    </>
  );
}
