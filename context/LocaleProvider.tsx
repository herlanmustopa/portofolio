"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { IntlProvider } from "next-intl";

// Import both message files
import enMessages from "@/messages/en.json";
import idMessages from "@/messages/id.json";

type Locale = "id" | "en";

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const messages = {
    id: idMessages,
    en: enMessages,
};

interface LocaleProviderProps {
    children: ReactNode;
    initialLocale: Locale;
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
    const [locale, setLocaleState] = useState<Locale>(initialLocale);
    const [mounted, setMounted] = useState(false);

    // Set mounted after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);

        // Update cookie for server-side persistence
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

        // Update URL without page reload (shallow navigation)
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(/^\/(id|en)/, `/${newLocale}`);

        // Use replaceState for instant URL update without navigation
        window.history.replaceState(
            { ...window.history.state, locale: newLocale },
            "",
            newPath
        );

        // Update html lang attribute
        document.documentElement.lang = newLocale;
    }, []);

    const toggleLocale = useCallback(() => {
        const newLocale = locale === "id" ? "en" : "id";
        setLocale(newLocale);
    }, [locale, setLocale]);

    // Prevent hydration mismatch by using initialLocale until mounted
    const currentLocale = mounted ? locale : initialLocale;

    return (
        <LocaleContext.Provider value={{ locale: currentLocale, setLocale, toggleLocale }}>
            <IntlProvider
                locale={currentLocale}
                messages={messages[currentLocale]}
                timeZone="Asia/Jakarta"
            >
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    );
}

export function useLocaleContext() {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error("useLocaleContext must be used within a LocaleProvider");
    }
    return context;
}

export { type Locale };
