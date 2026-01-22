import "./globals.css";
import { ClientComponents } from "@/components/providers/ClientComponents";

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
    <html lang="id" className="font-albert-sans" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-primary dark:bg-dark-bg min-h-screen overflow-auto text-black dark:text-dark-text transition-colors duration-300" suppressHydrationWarning>
        {children}
        <ClientComponents />
      </body>
    </html>
  );
}



