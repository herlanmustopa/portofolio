"use client";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

// 👇 PROPER TYPING UNTUK VARIANTS 👇
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
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

const skillItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// 👇 FIXED INTERFACE TYPING 👇
interface IExpertise {
  icon: string;
  title: string;
  skills: string[]; // More specific typing
  gradient?: string;
}

function TechCard({
  icon,
  title,
  skills,
  gradient = "from-green/5 to-green/10",
}: IExpertise) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${gradient} dark:from-dark-card dark:to-dark-card border border-green/10 dark:border-dark-border backdrop-blur-sm group cursor-pointer h-full
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-xl hover:border-green/20 dark:hover:border-green-light/30`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
        <div className="text-8xl">{icon}</div>
      </div>

      {/* Icon */}
      <div className="text-5xl mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Title */}
      <h3
        className={`text-xl lg:text-2xl font-bold text-black dark:text-dark-text mb-4 relative z-10 ${unbounded.className}`}
      >
        {title}
      </h3>

      {/* Skills List */}
      <ul className="space-y-3 relative z-10">
        {skills.map((skill: string, index: number) => (
          <li
            key={index}
            className={`text-sm lg:text-base text-black/80 dark:text-dark-text-muted flex items-start group-hover:text-black dark:group-hover:text-dark-text transition-colors duration-200 ${albert_Sans.className}`}
          >
            <span className="text-green dark:text-green-light mr-3 mt-1 font-bold">✓</span>
            <span className="leading-relaxed">{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Expertise() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const expertiseData: IExpertise[] = [
    {
      icon: "🚀",
      title: "Frontend Development",
      skills: [
        "ReactJS, Next.js, VueJS, NuxtJS",
        "TypeScript & JavaScript (ES6+)",
        "State Management (Redux, Context)",
        "Styling with Tailwind, MUI, Vuetify",
        "SEO Optimization (SSR & SSG)",
      ],
      gradient: "from-blue-50 to-blue-100",
    },
    {
      icon: "⚙️",
      title: "Backend & FullStack",
      skills: [
        "Node.js & Java Springboot",
        "RESTful API & GraphQL Design",
        "Microservice Architecture",
        "API Integration (Axios, Fetch, SWR)",
        "CMS Sitecore & Thymeleaf",
      ],
      gradient: "from-green-50 to-green-100",
    },
    {
      icon: "🛠️",
      title: "DevOps & Tooling",
      skills: [
        "CI/CD with Jenkins, GitHub Actions",
        "Containerization (Docker)",
        "Testing with Cypress",
        "Agile (Scrum, Kanban) & SDLC (Jira)",
        "Git, GitHub, Bitbucket, GitLab",
      ],
      gradient: "from-purple-50 to-purple-100",
    },
  ];

  return (
    <section className="bg-primary dark:bg-dark-bg py-24 transition-colors duration-300" id="expertice">
      <Page>
        <motion.div
          ref={ref}
          className="w-full text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.h1
            className={`text-6xl lg:text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}
            variants={itemVariants}
          >
            My Expertise
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-16 text-black dark:text-dark-text ${unbounded.className}`}
            variants={itemVariants}
          >
            Crafting Digital Solutions
          </motion.h2>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            variants={containerVariants}
          >
            {expertiseData.map((expertise, index) => (
              <motion.div key={index} custom={index} variants={itemVariants} className="h-full">
                <TechCard {...expertise} />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div className="mt-16 text-center" variants={itemVariants}>
            <motion.p
              className={`text-black/70 dark:text-dark-text-muted mb-6 max-w-2xl mx-auto ${albert_Sans.className}`}
              variants={itemVariants}
            >
              Ready to bring your vision to life? Let&apos;s discuss how these
              skills can solve your challenges.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`bg-green dark:bg-green-light text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-green-80 dark:hover:bg-green ${albert_Sans.className}`}
            >
              Let&apos;s Work Together
            </motion.button>
          </motion.div>
        </motion.div>
      </Page>
    </section>
  );
}
