import { albert_Sans } from "@/utils/font";
import "./globals.css";
import "./globalicons.css";
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
        {/* Preconnect to Google Fonts for faster connection */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Load Material Icons after page is interactive - not in critical path */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defer loading Material Icons until after first paint
              if (typeof window !== 'undefined') {
                var loadFonts = function() {
                  var link1 = document.createElement('link');
                  link1.rel = 'stylesheet';
                  link1.href = 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap';
                  document.head.appendChild(link1);

                  var link2 = document.createElement('link');
                  link2.rel = 'stylesheet';
                  link2.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
                  document.head.appendChild(link2);
                };

                if (document.readyState === 'complete') {
                  loadFonts();
                } else {
                  window.addEventListener('load', loadFonts);
                }
              }
            `,
          }}
        />
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
