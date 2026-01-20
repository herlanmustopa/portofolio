"use client";
import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import profilePlaceholder from "../../public/img/ID_CARD.png";

// Varian animasi untuk container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const textVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// 👇 PERBAIKAN UTAMA: Format ease yang benar 👇
const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Type assertion untuk cubic bezier
    },
  },
};

interface AboutProps {
  onContactClick?: () => void;
}

export default function About({ onContactClick }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const coreValues = [
    { icon: "💡", text: "Innovative Solutions" },
    { icon: "🎯", text: "Detail-Oriented & Precise" },
    { icon: "🤝", text: "Collaborative Team Player" },
    { icon: "📈", text: "Continuous Learning" },
  ];

  return (
    <section className="bg-primary dark:bg-dark-bg py-24 transition-colors duration-300" id="about">
      <Page>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
        >
          <motion.div
            variants={imageVariant}
            className="lg:col-span-2 w-full flex justify-center lg:justify-start"
          >
            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-2xl">
              <Image
                src={profilePlaceholder}
                alt="Herlan Mustopa"
                fill
                style={{ objectFit: "cover" }}
                className="scale-110"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-3 text-left">
            <motion.h1
              variants={textVariant}
              className={`text-6xl text-green dark:text-green-light mb-4 ${thesignature.className}`}
            >
              About Me
            </motion.h1>
            <motion.h2
              variants={textVariant}
              className={`text-2xl font-semibold text-black dark:text-dark-text mb-6 ${unbounded.className}`}
            >
              From Code to Cloud: A Developers Journey
            </motion.h2>
            <motion.p
              variants={textVariant}
              className={`text-black/80 dark:text-dark-text-muted mb-8 leading-relaxed ${albert_Sans.className}`}
            >
              With over 8 years in the digital trenches, Ive evolved from a
              dedicated Frontend Developer to a versatile FullStack
              professional, passionate about building complex web applications
              that are both functional and delightful. My journey across
              companies like Maybank and Telkom has equipped me with a robust
              skill set in React, Next.js, and Java Springboot. I dont just
              write code; I architect seamless user experiences, optimize for
              performance and SEO, and thrive in agile environments.
            </motion.p>

            <motion.div
              variants={textVariant}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <span className="text-2xl mr-3">{value.icon}</span>
                  <span
                    className={`font-semibold text-black dark:text-dark-text ${albert_Sans.className}`}
                  >
                    {value.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={textVariant}
              className="flex items-center gap-4"
            >
              <motion.a
                href="https://drive.google.com/file/d/1tO_sVJOjwjCiJLApWWD_ggPWZuwhL6RX/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`bg-green dark:bg-green-light text-white font-bold py-3 px-8 rounded-full transition-colors hover:bg-green-80 dark:hover:bg-green shadow-lg ${albert_Sans.className}`}
              >
                Download CV
              </motion.a>
              <motion.button
                onClick={onContactClick}
                whileHover={{
                  scale: 1.05,
                  x: 5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`font-bold text-black dark:text-dark-text hover:text-green dark:hover:text-green-light transition-colors cursor-pointer ${albert_Sans.className}`}
              >
                Lets Talk →
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </Page>
    </section>
  );
}
