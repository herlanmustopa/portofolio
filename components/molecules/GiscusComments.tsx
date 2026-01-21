"use client";

import { useEffect, useRef } from "react";
import { useLocaleContext } from "@/context/LocaleProvider";

interface GiscusCommentsProps {
    /**
     * The unique identifier for this discussion
     * Usually the article slug or path
     */
    discussionTerm?: string;
}

export default function GiscusComments({ discussionTerm }: GiscusCommentsProps) {
    const { locale } = useLocaleContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Remove existing script if any (for locale/theme changes)
        if (scriptRef.current) {
            scriptRef.current.remove();
        }
        containerRef.current.innerHTML = '';

        // Get current theme
        const isDark = document.documentElement.classList.contains('dark');
        const theme = isDark ? 'dark' : 'light';

        // Create Giscus script
        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", "herlanmustopa/portofolio");
        script.setAttribute("data-repo-id", "R_kgDOGhzdUg"); // Your repo ID
        script.setAttribute("data-category", "General");
        script.setAttribute("data-category-id", "DIC_kwDOGhzdUs4C1ODb"); // Will be filled after setup
        script.setAttribute("data-mapping", discussionTerm ? "specific" : "pathname");
        script.setAttribute("data-term", discussionTerm || "");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", theme);
        script.setAttribute("data-lang", locale);
        script.setAttribute("data-loading", "lazy");
        script.crossOrigin = "anonymous";
        script.async = true;

        containerRef.current.appendChild(script);
        scriptRef.current = script;

        // Cleanup on unmount
        return () => {
            if (scriptRef.current) {
                scriptRef.current.remove();
            }
        };
    }, [locale, discussionTerm]);

    // Listen for theme changes
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isDark = document.documentElement.classList.contains('dark');
                    const theme = isDark ? 'dark' : 'light';

                    // Send message to Giscus iframe to update theme
                    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
                    if (iframe) {
                        iframe.contentWindow?.postMessage(
                            { giscus: { setConfig: { theme } } },
                            'https://giscus.app'
                        );
                    }
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="mt-16 pt-8 border-t border-green/20 dark:border-green-light/20">
            <h2 className="text-2xl font-bold text-black dark:text-dark-text mb-6">
                {locale === "id" ? "Komentar" : "Comments"}
            </h2>
            <div ref={containerRef} className="giscus-container" />
        </section>
    );
}
