"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Page from "./pages";
import { albert_Sans } from "@/utils/font";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");

  return (
    <footer className="bg-navy text-white">
      <Page>
        <div className="py-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div className="flex-shrink-0">
            <h3 className={`text-lg font-bold ${albert_Sans.className}`}>
              Herlan Mustopa
            </h3>
            <p className="text-white/70">{t("role")}</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/herlanmustopa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/herlanmustopa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:herlan.mustopa01@gmail.com"
              className="hover:text-gold transition-colors"
            >
              Email
            </a>
          </div>
          <p className="text-sm text-white/50">
            &copy; {currentYear} Herlan Mustopa. {t("rights")}
          </p>
        </div>
      </Page>
    </footer>
  );
}
