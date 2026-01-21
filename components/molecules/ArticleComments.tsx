"use client";

import GiscusComments from "@/components/molecules/GiscusComments";

interface ArticleCommentsProps {
    slug: string;
}

export default function ArticleComments({ slug }: ArticleCommentsProps) {
    return <GiscusComments discussionTerm={slug} />;
}
