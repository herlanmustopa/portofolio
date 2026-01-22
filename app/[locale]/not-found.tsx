"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Page from "@/components/organisms/pages";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="bg-primary dark:bg-dark-bg min-h-screen flex items-center justify-center transition-colors duration-300 overflow-hidden">
      <Page>
        <div className="text-center relative">
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-green/5 dark:bg-green-light/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-green/5 dark:bg-green-light/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.8, 0.5, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className="relative"
          >
            <motion.h1
              className={`text-[10rem] md:text-[14rem] font-bold text-green/10 dark:text-green-light/10 select-none font-unbounded`}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {t("title")}
            </motion.h1>

            {/* Overlay text */}
            <motion.span
              className={`absolute inset-0 flex items-center justify-center text-7xl md:text-9xl font-bold text-green dark:text-green-light font-unbounded`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Oops!
            </motion.span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4"
          >
            <h2 className={`text-2xl md:text-3xl font-semibold text-black dark:text-dark-text mb-4 font-unbounded`}>
              {t("subtitle")}
            </h2>
            <p className={`text-text-secondary dark:text-dark-text-muted mb-8 max-w-md mx-auto font-albert-sans`}>
              {t("description")}
            </p>
          </motion.div>

          {/* Animated illustration */}
          <motion.div
            className="my-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                width="200"
                height="150"
                viewBox="0 0 200 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green dark:text-green-light"
              >
                {/* Astronaut/Lost icon */}
                <motion.circle
                  cx="100"
                  cy="60"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
                <motion.path
                  d="M85 55 L95 65 M95 55 L85 65"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                />
                <motion.path
                  d="M105 55 L115 65 M115 55 L105 65"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                />
                <motion.path
                  d="M90 80 Q100 90 110 80"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                />
                {/* Question marks */}
                <motion.text
                  x="140"
                  y="40"
                  fill="currentColor"
                  className="text-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  ?
                </motion.text>
                <motion.text
                  x="50"
                  y="50"
                  fill="currentColor"
                  className="text-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                >
                  ?
                </motion.text>
                {/* Ground line */}
                <motion.path
                  d="M30 120 L170 120"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="5 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Back home button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link href="/">
              <motion.span
                className={`inline-flex items-center gap-2 bg-green dark:bg-green-light text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-shadow font-albert-sans`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                {t("backHome")}
              </motion.span>
            </Link>
          </motion.div>

          {/* Decorative signature */}
          <motion.p
            className={`mt-12 text-4xl text-green/30 dark:text-green-light/30 font-thesignature`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Lost in space
          </motion.p>
        </div>
      </Page>
    </main>
  );
}
