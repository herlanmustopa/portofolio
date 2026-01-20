import { Metadata } from "next";
import HomeClient from "@/components/templates/HomeClient";
import { getArticles } from "@/sanity/queries";

// Enhanced metadata for SEO
export const metadata: Metadata = {
  title: "Herlan Mustopa | Fullstack Developer & Software Engineer",
  description:
    "Portfolio of Herlan Mustopa - Fullstack Developer & Software Engineer specializing in React, Next.js, and modern web technologies. Elevating every interaction beyond expectation.",
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
    locale: "id_ID",
    url: "https://herlanmustopa.com",
    siteName: "Herlan Mustopa Portfolio",
    title: "Herlan Mustopa | Fullstack Developer & Software Engineer",
    description:
      "Portfolio of Herlan Mustopa - Fullstack Developer & Software Engineer specializing in React, Next.js, and modern web technologies.",
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
    title: "Herlan Mustopa | Fullstack Developer & Software Engineer",
    description:
      "Portfolio of Herlan Mustopa - Fullstack Developer & Software Engineer specializing in React, Next.js, and modern web technologies.",
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

// JSON-LD structured data for the homepage
function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Herlan Mustopa",
    url: "https://herlanmustopa.com",
    jobTitle: ["Fullstack Developer", "Software Engineer", "Product Engineer"],
    description:
      "Fullstack Developer & Software Engineer specializing in React, Next.js, and modern web technologies",
    sameAs: [
      "https://github.com/herlanmustopa",
      "https://linkedin.com/in/herlanmustopa",
    ],
  };
}

export default async function Home() {
  // Fetch articles server-side for SSR
  const articles = await getArticles();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd()),
        }}
      />
      <HomeClient articles={articles} />
    </>
  );
}
