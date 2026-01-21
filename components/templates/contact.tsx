"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import Toast from "../molecules/Toast";

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
  const t = useTranslations("contact");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ fullName: "", email: "", message: "" });
        showToast(t("success"), "success");
      } else {
        showToast(data.error || t("error"), "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(t("error"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white dark:bg-dark-card py-24 transition-colors duration-300" id="contact">
      <Page>
        <motion.div
          className="w-full text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1
            className={`text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}
            variants={itemVariants}
          >
            {t("title")}
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text ${unbounded.className}`}
            variants={itemVariants}
          >
            {t("subtitle")}
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
                {t("form.fullName")}
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                autoComplete="name"
                placeholder={t("form.fullName")}
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-dark-bg text-black dark:text-dark-text focus:ring-2 focus:ring-green dark:focus:ring-green-light focus:border-green dark:focus:border-green-light border border-gray-300 dark:border-dark-border rounded-md transition-all duration-300 ${albert_Sans.className}`}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="email" className="sr-only">
                {t("form.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("form.email")}
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-dark-bg text-black dark:text-dark-text focus:ring-2 focus:ring-green dark:focus:ring-green-light focus:border-green dark:focus:border-green-light border border-gray-300 dark:border-dark-border rounded-md transition-all duration-300 ${albert_Sans.className}`}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="message" className="sr-only">
                {t("form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t("form.message")}
                value={formData.message}
                onChange={handleInputChange}
                required
                className={`block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-dark-bg text-black dark:text-dark-text focus:ring-2 focus:ring-green dark:focus:ring-green-light focus:border-green dark:focus:border-green-light border border-gray-300 dark:border-dark-border rounded-md transition-all duration-300 resize-none ${albert_Sans.className}`}
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
                className={`w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-green dark:bg-green-light hover:bg-green-80 dark:hover:bg-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green dark:focus:ring-green-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${albert_Sans.className}`}
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
                    {t("form.sending")}
                  </>
                ) : (
                  t("form.submit")
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
              className={`text-gray-600 dark:text-dark-text-muted mb-4 ${albert_Sans.className}`}
              variants={itemVariants}
            >
              {t("reachOut")}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="mailto:herlan.mustopa@outlook.com"
                className={`text-green dark:text-green-light hover:text-green-80 dark:hover:text-green font-semibold transition-colors ${albert_Sans.className}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                herlan.mustopa@outlook.com
              </motion.a>
              <motion.a
                href="tel:628119011099"
                className={`text-green dark:text-green-light hover:text-green-80 dark:hover:text-green font-semibold transition-colors ${albert_Sans.className}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                +62 81 1901 1099
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </Page>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </section>
  );
}
