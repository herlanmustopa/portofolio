import type { Metadata } from "next";
import "./globals.css";
import "./globalicons.css";
import Navbar from "@/components/organisms/navbar";
// import Footer from "@/components/organisms/footer";
import { Analytics } from "@vercel/analytics/next";
import { albert_Sans } from "@/utils/font";

export const metadata: Metadata = {
  title: "Herlan Mustopa",
  description: "Elevating Every Interactionl. Beyond Expectation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={albert_Sans.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../../../public/img/favicon/32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../../../public/img/favicon/16x16.png"
        />
      </head>
      <body className="bg-oss-gray h-[calc(100vh-78px)] overflow-auto text-base-black">
        <Analytics/>
        <Navbar />
        <main itemScope>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
