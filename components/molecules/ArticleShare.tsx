"use client";

import ShareButtons from "@/components/molecules/ShareButtons";

interface ArticleShareProps {
    title: string;
    description?: string;
}

export default function ArticleShare({ title, description }: ArticleShareProps) {
    return <ShareButtons title={title} description={description} />;
}
