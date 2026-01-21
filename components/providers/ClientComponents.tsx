"use client";

import dynamic from "next/dynamic";

// Lazy load components that aren't needed for initial render
const ScrollToTop = dynamic(
    () => import("@/components/molecules/ScrollToTop"),
    { ssr: false }
);
const GoogleAnalytics = dynamic(
    () => import("@/components/analytics/GoogleAnalytics").then(mod => ({ default: mod.GoogleAnalytics })),
    { ssr: false }
);

export function ClientComponents() {
    return (
        <>
            <ScrollToTop />
            <GoogleAnalytics />
        </>
    );
}
