"use client";

import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    let loaded = false;

    const loadGA = () => {
      if (loaded) return;
      loaded = true;

      // Remove event listeners after loading
      window.removeEventListener("scroll", loadGA);
      window.removeEventListener("click", loadGA);
      window.removeEventListener("touchstart", loadGA);

      // Load gtag.js
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID);
    };

    // Load on user interaction (scroll, click, or touch)
    window.addEventListener("scroll", loadGA, { once: true, passive: true });
    window.addEventListener("click", loadGA, { once: true });
    window.addEventListener("touchstart", loadGA, { once: true, passive: true });

    // Fallback: load after 5 seconds if no interaction
    const timeout = setTimeout(loadGA, 5000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", loadGA);
      window.removeEventListener("click", loadGA);
      window.removeEventListener("touchstart", loadGA);
    };
  }, []);

  return null;
}

// Type declaration for dataLayer
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
