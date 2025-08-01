"use client";
import React from "react";
import { motion } from "motion/react";
import { albert_Sans, unbounded, thesignature } from "@/utils/font";
import Button from "../molecules/button";
import Page from "../organisms/pages";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Banner() {
  return (
    <section id="banner" className="relative h-screen bg-[#001f3f]">
      <Page className="relative z-10 flex flex-col items-start justify-center h-full text-white">
        {/* Motion container to stagger children */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={`text-9xl text-gold mb-4 ${thesignature.className}`}
            variants={textVariant}
          >
            Herlan Mustopa
          </motion.h1>

          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 ${unbounded.className}`}
            variants={textVariant}
          >
            Elevating Every Interaction
          </motion.h2>

          <motion.p
            className={`text-base md:text-lg lg:text-xl max-w-2xl ${albert_Sans.className}`}
            variants={textVariant}
          >
            Imagine a digital journey where each moment feels tailor-made:
            seamless, inviting, and unexpectedly delightful. From the first
            glance to the final click, I sculpt experiences that immerse you in
            clarity and elegance—transforming every visit into a memorable
            adventure, crafted just for you
          </motion.p>

          <motion.div variants={textVariant}>
            <Button
              text="Take me there"
              className={`${albert_Sans.className} my-10 hover:bg-gold border-2 font-bold`}
            />
          </motion.div>
        </motion.div>
      </Page>
    </section>
  );
}
