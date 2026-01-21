"use client";

import { useEffect, useState } from "react";
import { albert_Sans } from "@/utils/font";

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
  className?: string;
}

export default function ViewCounter({
  slug,
  increment = false,
  className = "",
}: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        if (increment) {
          // Increment and get views
          const res = await fetch(`/api/views/${slug}`, {
            method: "POST",
          });
          const data = await res.json();
          setViews(data.views);
        } else {
          // Just get views
          const res = await fetch(`/api/views/${slug}`);
          const data = await res.json();
          setViews(data.views);
        }
      } catch {
        setViews(0);
      }
    };

    fetchViews();
  }, [slug, increment]);

  return (
    <span className={`inline-flex items-center gap-1 ${albert_Sans.className} ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {views === null ? (
        <span className="inline-block w-8 h-4 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
      ) : (
        <span>{views.toLocaleString()} views</span>
      )}
    </span>
  );
}
