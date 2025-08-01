"use client";
import React from "react";
import { motion } from "framer-motion";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Contact() {
  return (
    <section className="bg-white py-24" id="contact">
      <Page>
        <motion.div
          className="w-full text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h1 className={`text-7xl text-green mb-4 ${thesignature.className}`}>
            Get In Touch
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black ${unbounded.className}`}
          >
            Let's Build Something Great
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="full-name" className="sr-only">
                Full name
              </label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                autoComplete="name"
                placeholder="Full Name"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-green focus:border-green border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email Address"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-green focus:border-green border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your Message"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-green focus:border-green border-gray-300 rounded-md"
              ></textarea>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-green hover:bg-green-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
              >
                Send Message
              </button>
            </motion.div>
          </form>
        </div>
      </Page>
    </section>
  );
}
