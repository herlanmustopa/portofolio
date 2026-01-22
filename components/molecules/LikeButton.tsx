"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LikeButtonProps {
  slug: string;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

// Particle for heart burst effect
function HeartParticle({ index }: { index: number }) {
  const angle = (index * 45) + Math.random() * 20;
  const distance = 30 + Math.random() * 20;
  const size = 6 + Math.random() * 6;
  const duration = 0.4 + Math.random() * 0.2;

  const radian = (angle * Math.PI) / 180;
  const endX = Math.cos(radian) * distance;
  const endY = Math.sin(radian) * distance;

  const colors = ["#FF6B6B", "#FF8E8E", "#FFB4B4", "#FF5252", "#FF1744"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
      animate={{ scale: 0, x: endX, y: endY, opacity: 0 }}
      transition={{ duration, ease: "easeOut" }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
        pointerEvents: "none",
      }}
    />
  );
}

export default function LikeButton({ slug, showCount = true, size = "md" }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  useEffect(() => {
    // Check if user already liked this article
    const likedArticles = JSON.parse(localStorage.getItem("likedArticles") || "[]");
    setIsLiked(likedArticles.includes(slug));

    // Fetch current likes
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/likes/${slug}`);
        const data = await res.json();
        setLikes(data.likes);
      } catch {
        setLikes(0);
      }
    };
    fetchLikes();
  }, [slug]);

  const handleLike = async () => {
    if (isLiked || isAnimating) return;

    setIsAnimating(true);
    setParticles(Array.from({ length: 8 }, (_, i) => i));

    // Optimistic update
    setLikes((prev) => (prev !== null ? prev + 1 : 1));
    setIsLiked(true);

    // Save to localStorage
    const likedArticles = JSON.parse(localStorage.getItem("likedArticles") || "[]");
    likedArticles.push(slug);
    localStorage.setItem("likedArticles", JSON.stringify(likedArticles));

    // Send to API
    try {
      const res = await fetch(`/api/likes/${slug}`, { method: "POST" });
      const data = await res.json();
      setLikes(data.likes);
    } catch {
      // Revert on error
      setLikes((prev) => (prev !== null ? prev - 1 : 0));
      setIsLiked(false);
      const likedArticles = JSON.parse(localStorage.getItem("likedArticles") || "[]");
      const index = likedArticles.indexOf(slug);
      if (index > -1) {
        likedArticles.splice(index, 1);
        localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
      }
    }

    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 600);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <motion.button
        onClick={handleLike}
        className={`relative ${sizeClasses[size]} flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${isLiked
            ? "border-red-500 bg-red-500/10"
            : "border-green/20 dark:border-green-light/20 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
          }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isLiked}
        aria-label={isLiked ? "Liked" : "Like this article"}
      >
        {/* Particle effects */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {particles.map((index) => (
              <HeartParticle key={index} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Heart icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill={isLiked ? "#EF4444" : "none"}
          stroke={isLiked ? "#EF4444" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isLiked ? "text-red-500" : "text-text-secondary dark:text-dark-text-muted"}
          animate={isAnimating ? { scale: [1, 1.3, 0.9, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </motion.svg>

        {/* Ring effect on click */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-500"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {showCount && (
        <span className={`text-sm text-text-secondary dark:text-dark-text-muted font-albert-sans`}>
          {likes === null ? (
            <span className="inline-block w-6 h-4 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
          ) : (
            likes.toLocaleString()
          )}
        </span>
      )}
    </div>
  );
}

