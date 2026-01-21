"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { albert_Sans, unbounded, thesignature } from "@/utils/font";
import Button from "../molecules/button";
import Page from "../organisms/pages";

const containerVariants: Variants = {
  hidden: { opacity: 1 }, // Start visible for LCP
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const textVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  },
};

const nameVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0,
    },
  },
};

const floatingVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Banner() {
  const t = useTranslations("banner");

  const handleCTAClick = () => {
    const targetSection = document.getElementById("projects");
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="banner"
      className="relative h-screen animated-gradient-background overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating particles */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-gold rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full opacity-40"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-1 h-1 bg-gold rounded-full opacity-80"
          animate={{
            y: [0, -10, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <Page className="relative z-10 flex flex-col items-start justify-center h-full text-white">
        {/* Motion container to stagger children */}
        <motion.div
          className="space-y-6 max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name with special animation */}
          <motion.h1
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gold mb-4 leading-none ${thesignature.className}`}
            variants={nameVariant}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            Herlan Mustopa
          </motion.h1>

          {/* Subtitle with gradient text */}
          <motion.h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 bg-gradient-to-r from-white via-gray-100 to-gold bg-clip-text text-transparent ${unbounded.className}`}
            variants={textVariant}
          >
            {t("subtitle")}
          </motion.h2>

          {/* Description - LCP element, no animation delay */}
          <motion.p
            className={`text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed text-white/90 ${albert_Sans.className}`}
            variants={textVariant}
          >
            {t("description")}
          </motion.p>

          {/* CTA Button with enhanced animation */}
          <motion.div
            variants={floatingVariant}
            animate={["visible", "float"]}
            className="pt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                text={t("cta")}
                onClick={handleCTAClick}
                className={`${albert_Sans.className} my-10 hover:bg-gold border-2 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-gold/25`}
              />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center text-white/60 cursor-pointer"
              onClick={handleCTAClick}
              whileHover={{
                scale: 1.1,
                color: "#FFD700",
                transition: { duration: 0.2 }
              }}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className={`text-sm mb-2 ${albert_Sans.className}`}>
                {t("scrollToExplore")}
              </span>
              <motion.div
                className="w-6 h-10 border-2 border-current rounded-full flex justify-center"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-current rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Page>
    </section>
  );
}
