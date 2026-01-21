"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  contentKey: string;
}

const testimonialsMeta: Testimonial[] = [
  {
    id: 1,
    name: "Badrus Sholehk",
    role: "Tech Lead",
    company: "Telkom Indonesia",
    contentKey: "badrus",
  },
  {
    id: 3,
    name: "Gunawan",
    role: "Senior Developer",
    company: "Telkom Indonesia",
    contentKey: "gunawan",
  },
  {
    id: 4,
    name: "Syauqi Fajri",
    role: "Senior Software Developer",
    company: "Ikonsultan Inovatama",
    contentKey: "syauqi",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("testimonials");

  const testimonials = testimonialsMeta.map((item) => ({
    ...item,
    content: t(`items.${item.contentKey}.content`),
  }));

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-white dark:bg-dark-card py-24 transition-colors duration-300" id="testimonials">
      <Page>
        {/* Header */}
        <motion.div
          className="w-full text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-6xl lg:text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}>
            {t("title")}
          </h1>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text ${unbounded.className}`}>
            {t("subtitle")}
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <div className="absolute -top-8 left-0 text-8xl text-green/10 dark:text-green-light/10 font-serif">
              &ldquo;
            </div>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center px-8 md:px-16"
              >
                {/* Avatar */}
                <div className="mb-8 flex justify-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green dark:border-green-light shadow-lg">
                    <div className="w-full h-full bg-green/20 dark:bg-green-light/20 flex items-center justify-center text-4xl">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className={`text-lg md:text-xl text-black/80 dark:text-dark-text-muted leading-relaxed mb-8 italic ${albert_Sans.className}`}>
                  &ldquo;{testimonials[activeIndex].content}&rdquo;
                </p>

                {/* Author Info */}
                <div>
                  <h4 className={`text-xl font-bold text-black dark:text-dark-text ${unbounded.className}`}>
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className={`text-green dark:text-green-light font-medium ${albert_Sans.className}`}>
                    {testimonials[activeIndex].role}
                  </p>
                  <p className={`text-black/60 dark:text-dark-text-muted text-sm ${albert_Sans.className}`}>
                    {testimonials[activeIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-green/10 dark:bg-green-light/10 text-green dark:text-green-light flex items-center justify-center hover:bg-green/20 dark:hover:bg-green-light/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-green dark:bg-green-light w-8"
                        : "bg-green/30 dark:bg-green-light/30 hover:bg-green/50 dark:hover:bg-green-light/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-green/10 dark:bg-green-light/10 text-green dark:text-green-light flex items-center justify-center hover:bg-green/20 dark:hover:bg-green-light/20 transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </Page>
    </section>
  );
}
