"use client";

import { useTranslations } from "next-intl";
import { thesignature, unbounded, albert_Sans } from "@/app/fonts";
import Page from "@/components/organisms/pages";
import { ArticleGridSkeleton, Skeleton } from "@/components/molecules/Skeleton";

export default function BlogLoading() {
  const t = useTranslations("blog");

  return (
    <main className="bg-primary dark:bg-dark-bg pt-32 pb-16 min-h-screen transition-colors duration-300">
      <Page>
        {/* Breadcrumb skeleton */}
        <div className="mb-8">
          <Skeleton className="h-5 w-40" />
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <h1
            className={`text-6xl lg:text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}
          >
            {t("title")}
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text ${unbounded.className}`}
          >
            {t("subtitle")}
          </h2>
          <p
            className={`mt-4 text-black/70 dark:text-dark-text-muted max-w-2xl mx-auto ${albert_Sans.className}`}
          >
            {t("description")}
          </p>
        </header>

        {/* Search skeleton */}
        <div className="max-w-xl mx-auto mb-12">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>

        {/* Articles Grid Skeleton */}
        <ArticleGridSkeleton count={6} />
      </Page>
    </main>
  );
}
