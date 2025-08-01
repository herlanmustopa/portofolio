"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import profilePlaceholder from "../../public/img/react.png";

// Varian animasi untuk container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const textVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const coreValues = [
    { icon: "💡", text: "Innovative Solutions" },
    { icon: "🎯", text: "Detail-Oriented & Precise" },
    { icon: "🤝", text: "Collaborative Team Player" },
    { icon: "📈", text: "Continuous Learning" },
  ];

  return (
    <section className="bg-primary py-24" id="about">
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
                layout="fill"
                objectFit="cover"
                className="scale-110"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-3 text-left">
            <motion.h1
              variants={textVariant}
              className={`text-6xl text-green mb-4 ${thesignature.className}`}
            >
              About Me
            </motion.h1>
            <motion.h2
              variants={textVariant}
              className={`text-2xl font-semibold text-black mb-6 ${unbounded.className}`}
            >
              From Code to Cloud: A Developers Journey
            </motion.h2>
            <motion.p
              variants={textVariant}
              className={`text-black/80 mb-8 leading-relaxed ${albert_Sans.className}`}
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
                <div key={index} className="flex items-center">
                  <span className="text-2xl mr-3">{value.icon}</span>
                  <span
                    className={`font-semibold text-black ${albert_Sans.className}`}
                  >
                    {value.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={textVariant}
              className="flex items-center gap-4"
            >
              <motion.a
                // href="/CV Herlan 2025-EN.pdf" // Pastikan CV ada di folder /public
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green text-white font-bold py-3 px-8 rounded-full transition-colors hover:bg-green-80 shadow-lg"
              >
                Download CV
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-bold text-black hover:text-green transition-colors"
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
