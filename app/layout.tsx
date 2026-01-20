import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./globalicons.css";
import { Analytics } from "@vercel/analytics/next";
import { albert_Sans } from "@/utils/font";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF9F5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://herlanmustopa.com"),
  title: {
    default: "Herlan Mustopa | Fullstack Developer & Software Engineer",
    template: "%s | Herlan Mustopa",
  },
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
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://herlanmustopa.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/img/favicon/16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/img/favicon/32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

// Global JSON-LD schemas for SEO
function generateGlobalSchemas() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://herlanmustopa.com/#website",
    name: "Herlan Mustopa Portfolio",
    url: "https://herlanmustopa.com",
    description:
      "Portfolio of Herlan Mustopa - Fullstack Developer & Software Engineer",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = generateGlobalSchemas();

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
    <html lang="id" className={albert_Sans.className} suppressHydrationWarning>
      <head>
        {/* Prevent theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
      <body className="bg-primary dark:bg-dark-bg min-h-screen overflow-auto text-black dark:text-dark-text transition-colors duration-300">
        <Analytics />
        <SpeedInsights />
        <main itemScope>{children}</main>
      </body>
    </html>
  );
}
