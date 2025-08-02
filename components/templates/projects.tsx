"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import { cn } from "@/utils/classMerge";

// Placeholder images - Anda bisa menggantinya nanti
import placeholder1 from "../../public/img/react.png"; // Ganti dengan gambar proyek Anda
import placeholder2 from "../../public/img/react.png"; // Ganti dengan gambar proyek Anda
import placeholder3 from "../../public/img/react.png"; // Ganti dengan gambar proyek Anda
import placeholder4 from "../../public/img/react.png"; // Ganti dengan gambar proyek Anda
import placeholder5 from "../../public/img/react.png"; // Ganti dengan gambar proyek Anda

// Varian animasi untuk container
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

// Varian animasi untuk setiap item
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
    >
      {/* Kolom Gambar */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "rounded-lg overflow-hidden shadow-2xl",
          align === "right" && "lg:order-last"
        )}
      >
        <Image
          src={image}
          alt={title}
          width={1280}
          height={720}
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Kolom Deskripsi */}
      <div className={cn("text-left", align === "right" && "lg:text-right")}>
        <p className={`text-gold mb-2 ${albert_Sans.className}`}>{category}</p>
        <h3
          className={`text-3xl font-bold text-black mb-4 ${unbounded.className}`}
        >
          {title}
        </h3>
        <p className={`text-black/80 mb-6 ${albert_Sans.className}`}>
          {description}
        </p>
        <div
          className={cn(
            "flex flex-wrap gap-2 mb-6",
            align === "right" && "lg:justify-end"
          )}
        >
          {stack.map((tech) => (
            <span
              key={tech}
              className="bg-green/10 text-green text-sm font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div
          className={cn(
            "flex items-center gap-4",
            align === "right" && "lg:justify-end"
          )}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green text-white font-bold py-2 px-6 rounded-full transition-colors hover:bg-green-80"
          >
            View Case Study
          </motion.button>
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-bold hover:text-green transition-colors"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projectData: ProjectCardProps[] = [
    {
      image: placeholder1,
      title: "Portal OSS V2 - Rewrite",
      category: "Enterprise Web App | Sr. Frontend",
      description:
        "Spearheaded the complete rewrite of the national Online Single Submission portal, migrating from JavaScript to TypeScript and implementing modern, SEO-friendly features with Next.js (SSR/SSG).",
      stack: [
        "Next.js",
        "TypeScript",
        "ReactJS",
        "Tailwind CSS",
        "Cypress",
        "Rest-API",
      ],
      liveLink: "https://ujicoba-stg.oss.go.id/",
    },
    {
      image: placeholder2,
      title: "OSS - Sistem Perizinan Berusaha Terintegrasi Secara Elektronic",
      category: "Enterprise Web App | Sr. Frontend",
      description:
        "Spearheaded the complete rewrite of the national Online Single Submission portal, migrating from JavaScript to TypeScript and implementing modern, SEO-friendly features with Next.js (SSR/SSG).",
      stack: [
        "Next.js",
        "TypeScript",
        "ReactJS",
        "Tailwind CSS",
        "Cypress",
        "Rest-API",
      ],
      liveLink: "https://oss.go.id",
      align: "right",
    },
    {
      image: placeholder3,
      title: "Maybank M2U & BackOffice",
      category: "Fintech Web App | FullStack Developer",
      description:
        "Developed and maintained both the customer-facing M2U web app using ReactJS and the internal BackOffice system with Java, Spring Boot, and Thymeleaf, ensuring seamless integration and high performance.",
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
      category: "Healthcare Portal | Frontend",
      description:
        "Built two critical healthcare portals from scratch using Next.js and TypeScript. Implemented robust state management with Redux-Toolkit for complex data handling in clinical and DTP dashboards.",
      stack: [
        "Next.js",
        "TypeScript",
        "Redux-Toolkit",
        "Tailwind CSS",
        "Axios",
      ],
      liveLink: "http://satunadi-staging.dokternet.id/login",
      align: "right",
    },
    {
      image: placeholder5,
      title: "BRIAPI & Dynamic Channel",
      category: "API Management & Enterprise Solutions",
      description:
        "Engineered UI applications for BRI's API management (MIS-BRIAPI) and internal Dynamic Channel using ReactJS and MUI, integrating with both REST and GraphQL APIs for versatile data flow.",
      stack: ["ReactJS", "MUI", "Redux", "GraphQL", "Axios", "Git"],
      // align: "right",
    },
  ];

  return (
    <section className="bg-white py-24" id="projects">
      <Page>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="w-full text-center"
        >
          <motion.h1
            className={`text-7xl text-green mb-4 ${thesignature.className}`}
            variants={itemVariants}
          >
            Featured Projects
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-20 text-black ${unbounded.className}`}
            variants={itemVariants}
          >
            A Glimpse of My Work
          </motion.h2>
        </motion.div>

        <div className="space-y-24">
          {projectData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </Page>
    </section>
  );
}
