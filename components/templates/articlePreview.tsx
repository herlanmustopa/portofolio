"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";

// Sample data untuk artikel/studi kasus
const articles = [
  {
    image: "/img/react.png", // Ganti dengan gambar relevan
    category: "Case Study",
    title: "Rewriting OSS Portal: A Journey to Modern Frontend",
    description:
      "An in-depth look at the process of migrating a large-scale government portal to Next.js and TypeScript, focusing on performance, SEO, and developer experience.",
    link: "#", // Ganti dengan link ke artikel/studi kasus
  },
  {
    image: "/img/react.png", // Ganti dengan gambar relevan
    category: "Technical Deep Dive",
    title: "SSR vs SSG in Next.js: A Practical Guide",
    description:
      "Exploring the trade-offs between Server-Side Rendering and Static Site Generation based on real-world project requirements at Telkom.",
    link: "#",
  },
  {
    image: "/img/react.png", // Ganti dengan gambar relevan
    category: "Development Workflow",
    title: "Effective CI/CD Pipelines with GitHub Actions & Docker",
    description:
      "How we streamlined our deployment process at Maybank, reducing build times and improving reliability through containerization and automated workflows.",
    link: "#",
  },
];

export default function ArticlePreview() {
  return (
    <section className="bg-gold py-24" id="article">
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
            <motion.a
              key={index}
              href={article.link}
              className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <p className="text-gold text-sm font-semibold mb-2">
                  {article.category}
                </p>
                <h3
                  className={`text-xl font-bold text-black mb-3 ${unbounded.className}`}
                >
                  {article.title}
                </h3>
                <p className={`text-black/70 text-sm ${albert_Sans.className}`}>
                  {article.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </Page>
    </section>
  );
}
