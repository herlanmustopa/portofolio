import Page from "@/components/organisms/pages";
import { ArticleDetailSkeleton } from "@/components/molecules/Skeleton";

export default function ArticleLoading() {
  return (
    <main className="bg-primary dark:bg-dark-bg pt-32 pb-16 min-h-screen transition-colors duration-300">
      <Page>
        <ArticleDetailSkeleton />
      </Page>
    </main>
  );
}
