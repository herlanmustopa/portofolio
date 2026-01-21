import { albert_Sans } from "@/utils/font";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import ScrollToTop from "@/components/molecules/ScrollToTop";

// Script to prevent theme flash on page load
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

// This root layout is required by Next.js
// The actual content layout is handled by app/[locale]/layout.tsx with i18n support
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={albert_Sans.className} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-primary dark:bg-dark-bg min-h-screen overflow-auto text-black dark:text-dark-text transition-colors duration-300" suppressHydrationWarning>
        {children}
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
