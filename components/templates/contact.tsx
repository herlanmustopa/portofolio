"use client";
import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      console.log("Form submitted:", formData);
      // Add your form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      setFormData({ fullName: "", email: "", message: "" });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-24" id="contact">
      <Page>
        <motion.div
          className="w-full text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1
            className={`text-7xl text-green mb-4 ${thesignature.className}`}
            variants={itemVariants}
          >
            Get In Touch
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black ${unbounded.className}`}
            variants={itemVariants}
          >
            Let&apos;s Build Something Great
          </motion.h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={formVariants}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="fullName" className="sr-only">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                autoComplete="name"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-2 focus:ring-green focus:border-green border-gray-300 rounded-md transition-all duration-300 ${albert_Sans.className}`}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-2 focus:ring-green focus:border-green border-gray-300 rounded-md transition-all duration-300 ${albert_Sans.className}`}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-2 focus:ring-green focus:border-green border-gray-300 rounded-md transition-all duration-300 resize-none ${albert_Sans.className}`}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${albert_Sans.className}`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </motion.div>
          </form>

          {/* Contact Info */}
          <motion.div
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.p
              className={`text-gray-600 mb-4 ${albert_Sans.className}`}
              variants={itemVariants}
            >
              Or reach out directly:
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="mailto:herlan.mustopa@outlook.com"
                className={`text-green hover:text-green-600 font-semibold transition-colors ${albert_Sans.className}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📧 herlan.mustopa@outlook.com
              </motion.a>
              <motion.a
                href="tel:628119011099"
                className={`text-green hover:text-green-600 font-semibold transition-colors ${albert_Sans.className}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📞 +62 81 1901 1099
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </Page>
    </section>
  );
}
