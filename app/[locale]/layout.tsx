import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import "../globalicons.css";
import { albert_Sans } from "@/utils/font";
import { LocaleClientWrapper } from "@/context/LocaleClientWrapper";
import type { Locale } from "@/context/LocaleProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF9F5",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const isIndonesian = locale === "id";

  const title = "Herlan Mustopa | Fullstack Developer & Software Engineer";
  const description = isIndonesian
    ? "Portfolio Herlan Mustopa - Fullstack Developer & Software Engineer yang spesialis dalam React, Next.js, dan teknologi web modern. Meningkatkan setiap interaksi melampaui ekspektasi."
    : "Portfolio of Herlan Mustopa - Fullstack Developer & Software Engineer specializing in React, Next.js, and modern web technologies. Elevating every interaction beyond expectation.";

  return {
    metadataBase: new URL("https://herlanmustopa.com"),
    title: {
      default: title,
      template: "%s | Herlan Mustopa",
    },
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
      "Indonesia",
    ],
    authors: [{ name: "Herlan Mustopa", url: "https://herlanmustopa.com" }],
    creator: "Herlan Mustopa",
    publisher: "Herlan Mustopa",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: `https://herlanmustopa.com/${locale}`,
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
      creator: "@herlanmustopa",
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
    alternates: {
      canonical: `https://herlanmustopa.com/${locale}`,
      languages: {
        "id": "https://herlanmustopa.com/id",
        "en": "https://herlanmustopa.com/en",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/img/favicon/16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/img/favicon/32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/icon-192x192.png", sizes: "180x180" },
      ],
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "HM Portfolio",
    },
  };
}

// Global JSON-LD schemas for SEO
function generateGlobalSchemas(locale: string) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://herlanmustopa.com/#website",
    name: "Herlan Mustopa Portfolio",
    url: "https://herlanmustopa.com",
    description:
      "Portfolio of Herlan Mustopa - Fullstack Developer & Software Engineer",
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    publisher: {
      "@id": "https://herlanmustopa.com/#person",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://herlanmustopa.com/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://herlanmustopa.com/#person",
    name: "Herlan Mustopa",
    url: "https://herlanmustopa.com",
    image: "https://herlanmustopa.com/og-image.jpg",
    jobTitle: ["Fullstack Developer", "Software Engineer", "Product Engineer"],
    description:
      "Fullstack Developer & Software Engineer with 8+ years experience specializing in React, Next.js, and modern web technologies",
    email: "herlanmustopa@gmail.com",
    sameAs: [
      "https://github.com/herlanmustopa",
      "https://linkedin.com/in/herlanmustopa",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Java Spring Boot",
      "Frontend Development",
      "Backend Development",
      "Web Development",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Telkom Indonesia",
    },
    worksFor: {
      "@type": "Organization",
      name: "Maybank",
    },
  };

  return [websiteSchema, personSchema];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const schemas = generateGlobalSchemas(locale);

  // Script to prevent theme flash on page load
  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return (
    <html lang={locale} className={albert_Sans.className} suppressHydrationWarning>
      <head>
        {/* Prevent theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* hreflang tags for SEO */}
        <link rel="alternate" hrefLang="id" href="https://herlanmustopa.com/id" />
        <link rel="alternate" hrefLang="en" href="https://herlanmustopa.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://herlanmustopa.com/id" />
        {/* Global JSON-LD Schemas */}
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
      </head>
      <body className="bg-primary dark:bg-dark-bg min-h-screen overflow-auto text-black dark:text-dark-text transition-colors duration-300" suppressHydrationWarning>
        <LocaleClientWrapper initialLocale={locale as Locale}>
          {children}
        </LocaleClientWrapper>
      </body>
    </html>
  );
}

