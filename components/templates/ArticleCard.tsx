"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { albert_Sans, unbounded } from "@/utils/font";

interface Article {
  _id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  description: string;
}

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.a
      href={`/blog/${article.slug}`}
      className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      {article.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3
          className={`text-xl font-bold text-black mb-3 ${unbounded.className}`}
        >
          {article.title}
        </h3>
        <p className={`text-black/70 text-sm ${albert_Sans.className}`}>
          {article.description || "Klik untuk membaca lebih lanjut..."}
        </p>
      </div>
    </motion.a>
  );
}
