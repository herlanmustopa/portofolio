"use client";
import { motion } from "framer-motion";
import { thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import ArticleCard from "./ArticleCard";

interface Article {
  _id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  description: string;
}

interface ArticleSectionProps {
  articles: Article[];
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
  return (
    <section className="bg-primary py-24" id="article">
      <Page>
        <motion.div
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-7xl text-green mb-4 ${thesignature.className}`}>
            Writings & Insights
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black ${unbounded.className}`}
          >
            Sharing My Knowledge
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article._id} article={article} index={index} />
          ))}
        </div>
      </Page>
    </section>
  );
}
