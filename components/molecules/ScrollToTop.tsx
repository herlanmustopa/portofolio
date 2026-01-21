"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Particle component for spark/fire effect
function Particle({
  index,
  onComplete
}: {
  index: number;
  onComplete: () => void;
}) {
  // Random values for each particle
  const angle = (index * 30) + Math.random() * 20;
  const distance = 60 + Math.random() * 40;
  const size = 4 + Math.random() * 8;
  const duration = 0.4 + Math.random() * 0.3;

  // Calculate end position based on angle
  const radian = (angle * Math.PI) / 180;
  const endX = Math.cos(radian) * distance;
  const endY = Math.sin(radian) * distance;

  // Random colors for fire/spark effect
  const colors = [
    "#FFD700", // Gold
    "#FFA500", // Orange
    "#FF6B35", // Red-Orange
    "#FF4500", // Orange-Red
    "#00FF88", // Green (Sonic style)
    "#00FFFF", // Cyan
    "#FFFF00", // Yellow
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
      }}
      animate={{
        scale: 0,
        x: endX,
        y: endY,
        opacity: 0,
      }}
      transition={{
        duration,
        ease: "easeOut",
      }}
      onAnimationComplete={index === 0 ? onComplete : undefined}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        boxShadow: `0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color}`,
        pointerEvents: "none",
      }}
    />
  );
}

// Ring burst effect
function RingBurst({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "3px solid #00FF88",
        boxShadow: "0 0 20px #00FF88, inset 0 0 20px #00FF88",
        pointerEvents: "none",
      }}
    />
  );
}

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = useCallback(() => {
    // Trigger explosion effect
    setIsExploding(true);
    setParticles(Array.from({ length: 12 }, (_, i) => i));

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleExplosionComplete = useCallback(() => {
    setIsExploding(false);
    setParticles([]);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0,
            rotate: 180,
            y: -100,
            transition: {
              duration: 0.5,
              ease: "easeIn",
            }
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.6,
          }}
        >
          {/* Glow effect behind button */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green dark:bg-green-light blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Particle effects container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {isExploding && (
                <>
                  <RingBurst onComplete={handleExplosionComplete} />
                  {particles.map((index) => (
                    <Particle
                      key={index}
                      index={index}
                      onComplete={handleExplosionComplete}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Main button */}
          <motion.button
            onClick={handleClick}
            className="relative p-4 bg-gradient-to-br from-green to-green/80 dark:from-green-light dark:to-green-light/80 text-white rounded-full shadow-lg focus:outline-none"
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 30px rgba(0, 255, 136, 0.6)",
            }}
            whileTap={{
              scale: 0.9,
            }}
            animate={isExploding ? {
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0],
            } : {}}
            transition={{
              duration: 0.3,
            }}
            aria-label="Scroll to top"
          >
            {/* Rotating border effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent, #00FF88, transparent)",
                opacity: 0.5,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner glow */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-green to-green/80 dark:from-green-light dark:to-green-light/80" />

            {/* Arrow icon with animation */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path d="m18 15-6-6-6 6" />
            </motion.svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
