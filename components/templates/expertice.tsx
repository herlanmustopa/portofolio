"use client";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface IExpertice{
  icon: string;
  title: string;
  skills: any;
}


function TechCard({ icon, title, skills }: IExpertice) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="tech-card text-left"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3
        className={`text-xl font-bold text-black mb-3 ${unbounded.className}`}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {skills.map((skill: string, index: any) => (
          <li
            key={index}
            className={`text-md text-black/80 flex items-start ${albert_Sans.className}`}
          >
            <span className="text-green mr-2 mt-1">✓</span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Expertice() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="bg-primary py-24" id="expertice">
      <Page className="flex flex-col items-center justify-center h-full">
        <motion.div
          ref={ref}
          className="w-full text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className={`text-7xl text-green mb-4 ${thesignature.className}`}
            variants={itemVariants}
          >
            My Expertise
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-16 text-black ${unbounded.className}`}
            variants={itemVariants}
          >
            Crafting Digital Solutions
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard
              icon="🚀"
              title="Frontend Development"
              skills={[
                "ReactJS, Next.js, VueJS, NuxtJS",
                "TypeScript & JavaScript (ES6+)",
                "State Management (Redux, Context)",
                "Styling with Tailwind, MUI, Vuetify",
                "SEO (SSR & SSG)",
              ]}
            />
            <TechCard
              icon="⚙️"
              title="Backend & FullStack"
              skills={[
                "Node.js & Java Springboot",
                "RESTful API & GraphQL Design",
                "Microservice Architecture",
                "API Integration (Axios, Fetch, SWR)",
                "CMS Sitecore & Thymeleaf",
              ]}
            />
            <TechCard
              icon="🛠️"
              title="DevOps & Tooling"
              skills={[
                "CI/CD with Jenkins, GitHub Actions",
                "Containerization (Docker)",
                "Testing with Cypress",
                "Agile (Scrum, Kanban) & SDLC (Jira)",
                "Git, GitHub, Bitbucket, GitLab",
              ]}
            />
          </div>
        </motion.div>
      </Page>
    </div>
  );
}
