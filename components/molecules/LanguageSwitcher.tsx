"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { cn } from "@/utils/classMerge";
import { useLocaleContext } from "@/context/LocaleProvider";

interface LanguageSwitcherProps {
  className?: string;
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ className, isScrolled }: LanguageSwitcherProps) {
  const { locale, toggleLocale } = useLocaleContext();
  const [isAnimating, setIsAnimating] = useState(false);

  const isEnglish = locale === "en";

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    toggleLocale();

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, toggleLocale]);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* ID Label */}
      <motion.span
        className={cn(
          "text-sm font-bold cursor-pointer select-none",
          !isEnglish
            ? isScrolled
              ? "text-green dark:text-green-light"
              : "text-gold"
            : isScrolled
              ? "text-green/50 dark:text-green-light/50"
              : "text-white/50"
        )}
        animate={{
          scale: !isEnglish ? 1.1 : 1,
          opacity: !isEnglish ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => isEnglish && handleToggle()}
      >
        ID
      </motion.span>

      {/* Switch Container */}
      <motion.button
        onClick={handleToggle}
        disabled={isAnimating}
        className={cn(
          "relative w-14 h-7 rounded-full p-1 overflow-hidden",
          isAnimating && "cursor-wait",
          isScrolled
            ? "bg-green/20 dark:bg-green-light/20 shadow-[0_0_15px_rgba(0,128,0,0.2)]"
            : "bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${isEnglish ? "Indonesian" : "English"}`}
      >
        {/* Track Background with Gradient Animation */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full",
            isScrolled
              ? "bg-gradient-to-r from-green/40 via-green/20 to-green/40 dark:from-green-light/40 dark:via-green-light/20 dark:to-green-light/40"
              : "bg-gradient-to-r from-gold/40 via-white/20 to-gold/40"
          )}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            opacity: isAnimating ? 0.6 : 1,
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: { duration: 0.2 },
          }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* Glow Effect Behind Knob */}
        <motion.div
          className={cn(
            "absolute w-8 h-8 rounded-full blur-md -top-0.5",
            isScrolled
              ? "bg-green/50 dark:bg-green-light/50"
              : "bg-gold/50"
          )}
          initial={false}
          animate={{
            x: isEnglish ? 24 : -4,
            opacity: isAnimating ? 0.3 : 0.6,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        />

        {/* Sliding Knob */}
        <motion.div
          className={cn(
            "relative w-5 h-5 rounded-full shadow-lg flex items-center justify-center",
            isScrolled
              ? "bg-gradient-to-br from-green via-green to-green-dark dark:from-green-light dark:via-green-light dark:to-green"
              : "bg-gradient-to-br from-gold via-gold to-amber-600"
          )}
          initial={false}
          animate={{
            x: isEnglish ? 28 : 0,
            rotate: isEnglish ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            rotate: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          {/* Inner Highlight */}
          <motion.div
            className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/30 to-transparent"
            animate={{
              opacity: isAnimating ? 0.5 : 1,
            }}
          />
        </motion.div>
      </motion.button>

      {/* EN Label */}
      <motion.span
        className={cn(
          "text-sm font-bold cursor-pointer select-none",
          isEnglish
            ? isScrolled
              ? "text-green dark:text-green-light"
              : "text-gold"
            : isScrolled
              ? "text-green/50 dark:text-green-light/50"
              : "text-white/50"
        )}
        animate={{
          scale: isEnglish ? 1.1 : 1,
          opacity: isEnglish ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => !isEnglish && handleToggle()}
      >
        EN
      </motion.span>
    </div>
  );
}
