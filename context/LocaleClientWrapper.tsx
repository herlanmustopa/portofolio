"use client";

import { ReactNode } from "react";
import { LocaleProvider, Locale } from "./LocaleProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface LocaleClientWrapperProps {
    children: ReactNode;
    initialLocale: Locale;
}

export function LocaleClientWrapper({ children, initialLocale }: LocaleClientWrapperProps) {
    return (
        <LocaleProvider initialLocale={initialLocale}>
            <Analytics />
            <SpeedInsights />
            <main itemScope>{children}</main>
        </LocaleProvider>
    );
}
