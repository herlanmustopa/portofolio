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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={albert_Sans.className}>
      <body className="bg-oss-gray h-[calc(100vh-78px)] overflow-auto text-base-black">
        <Analytics />
        <SpeedInsights />
        <main itemScope>{children}</main>
      </body>
    </html>
  );
}
