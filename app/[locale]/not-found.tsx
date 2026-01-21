"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { unbounded, albert_Sans } from "@/utils/font";
import Page from "@/components/organisms/pages";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="bg-primary dark:bg-dark-bg min-h-screen flex items-center justify-center transition-colors duration-300">
      <Page>
        <div className="text-center">
          <h1 className={`text-9xl font-bold text-green dark:text-green-light mb-4 ${unbounded.className}`}>
            {t("title")}
          </h1>
          <h2 className={`text-2xl md:text-3xl font-semibold text-black dark:text-dark-text mb-4 ${unbounded.className}`}>
            {t("subtitle")}
          </h2>
          <p className={`text-black/60 dark:text-dark-text-muted mb-8 ${albert_Sans.className}`}>
            {t("description")}
          </p>
          <Link
            href="/"
            className={`inline-block bg-green dark:bg-green-light text-white px-6 py-3 rounded-full font-bold hover:bg-green/90 dark:hover:bg-green transition-colors ${albert_Sans.className}`}
          >
            {t("backHome")}
          </Link>
        </div>
      </Page>
    </main>
  );
}
