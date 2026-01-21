"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, type Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import { cn } from "@/utils/classMerge";

// Placeholder images - Anda bisa menggantinya nanti
import placeholder1 from "../../public/img/ossv2.png";
import placeholder2 from "../../public/img/ossv1.png";
import placeholder3 from "../../public/img/Maybank.png";
import placeholder4 from "../../public/img/satunadi.png";
import placeholder5 from "../../public/img/Birapi.png";

// 👇 PROPER TYPING UNTUK VARIANTS 👇
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

interface ProjectCardProps {
  image: StaticImageData;
  title: string;
  category: string;
  description: string;
  stack: string[];
  liveLink?: string;
  caseLink?: string;
  align?: "left" | "right";
  index?: number;
  viewCaseStudyText: string;
  liveDemoText: string;
  clickToViewDetailsText: string;
}

// Komponen Card untuk setiap Proyek
const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  category,
  description,
  stack,
  liveLink,
  caseLink,
  align = "left",
  index = 0,
  viewCaseStudyText,
  liveDemoText,
  clickToViewDetailsText,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleCaseStudyClick = () => {
    if (caseLink) {
      window.open(caseLink, "_blank", "noopener,noreferrer");
    } else {
      // Fallback behavior - you can customize this
      console.log(`Case study for ${title} - Coming soon!`);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      {/* Kolom Gambar */}
      <motion.div
        whileHover={{
          scale: 1.03,
          rotateY: align === "right" ? -5 : 5,
          rotateX: 2,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          "relative rounded-lg overflow-hidden shadow-2xl group cursor-pointer",
          align === "right" && "lg:order-last"
        )}
        style={{ perspective: "1000px" }}
      >
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={1280}
            height={720}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            priority={index < 2} // Prioritize first 2 images
          />

          {/* Overlay with project info */}
          <motion.div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="text-center text-white p-6">
              <p className={`text-xl font-bold mb-2 ${unbounded.className}`}>
                {title}
              </p>
              <p className={`text-sm opacity-90 ${albert_Sans.className}`}>
                {clickToViewDetailsText}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Kolom Deskripsi */}
      <motion.div
        className={cn("text-left", align === "right" && "lg:text-right")}
        variants={itemVariants}
      >
        <motion.p
          className={`text-gold mb-2 font-semibold ${albert_Sans.className}`}
          initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: align === "right" ? 20 : -20 }
          }
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {category}
        </motion.p>

        <motion.h3
          className={`text-3xl lg:text-4xl font-bold text-black dark:text-dark-text mb-4 ${unbounded.className}`}
          initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: align === "right" ? 20 : -20 }
          }
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className={`text-black/80 dark:text-dark-text-muted mb-6 leading-relaxed ${albert_Sans.className}`}
          initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: align === "right" ? 20 : -20 }
          }
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>

        <motion.div
          className={cn(
            "flex flex-wrap gap-2 mb-6",
            align === "right" && "lg:justify-end"
          )}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {stack.map((tech, techIndex) => (
            <motion.span
              key={tech}
              className={`bg-green/10 dark:bg-green-light/10 text-green dark:text-green-light text-sm font-medium px-3 py-1 rounded-full border border-green/20 dark:border-green-light/20 hover:bg-green/20 dark:hover:bg-green-light/20 transition-colors ${albert_Sans.className}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.6 + techIndex * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className={cn(
            "flex items-center gap-4",
            align === "right" && "lg:justify-end"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.button
            onClick={handleCaseStudyClick}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`bg-green dark:bg-green-light text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-green-80 dark:hover:bg-green shadow-lg ${albert_Sans.className}`}
          >
            {viewCaseStudyText}
          </motion.button>

          {liveLink && (
            <motion.a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-black dark:text-dark-text font-bold hover:text-green dark:hover:text-green-light transition-colors group ${albert_Sans.className}`}
              whileHover={{ x: 5 }}
            >
              {liveDemoText}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("projects");

  const projectData = [
    {
      image: placeholder1,
      title: "Portal OSS V2 - Rewrite",
      category: t("items.ossv2.category"),
      description: t("items.ossv2.description"),
      stack: [
        "Next.js",
        "TypeScript",
        "ReactJS",
        "Tailwind CSS",
        "Cypress",
        "REST API",
      ],
      liveLink: "https://ujicoba-stg.oss.go.id/",
    },
    {
      image: placeholder2,
      title: "OSS - Sistem Perizinan Berusaha Terintegrasi Secara Elektronic",
      category: t("items.oss.category"),
      description: t("items.oss.description"),
      stack: [
        "Next.js",
        "TypeScript",
        "ReactJS",
        "Tailwind CSS",
        "Cypress",
        "REST API",
      ],
      liveLink: "https://oss.go.id",
      align: "right" as const,
    },
    {
      image: placeholder3,
      title: "Maybank M2U & BackOffice",
      category: t("items.maybank.category"),
      description: t("items.maybank.description"),
      stack: [
        "ReactJS",
        "Java",
        "Spring Boot",
        "Thymeleaf",
        "Redux-Saga",
        "Azure DevOps",
      ],
    },
    {
      image: placeholder4,
      title: "SATUNADI SimKlinik & DTP",
      category: t("items.satunadi.category"),
      description: t("items.satunadi.description"),
      stack: [
        "Next.js",
        "TypeScript",
        "Redux-Toolkit",
        "Tailwind CSS",
        "Axios",
      ],
      liveLink: "http://satunadi-staging.dokternet.id/login",
      align: "right" as const,
    },
    {
      image: placeholder5,
      title: "BRIAPI & Dynamic Channel",
      category: t("items.briapi.category"),
      description: t("items.briapi.description"),
      stack: ["ReactJS", "MUI", "Redux", "GraphQL", "Axios", "Git"],
    },
  ];

  return (
    <section className="bg-white dark:bg-dark-card py-24 transition-colors duration-300" id="projects">
      <Page>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="w-full text-center"
        >
          <motion.h1
            className={`text-6xl lg:text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}
            variants={itemVariants}
          >
            {t("title")}
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-20 text-black dark:text-dark-text ${unbounded.className}`}
            variants={itemVariants}
          >
            {t("subtitle")}
          </motion.h2>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {projectData.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
              viewCaseStudyText={t("viewCaseStudy")}
              liveDemoText={t("liveDemo")}
              clickToViewDetailsText={t("clickToViewDetails")}
            />
          ))}
        </div>
      </Page>
    </section>
  );
}
