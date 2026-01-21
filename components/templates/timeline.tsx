"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Page from "../organisms/pages";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import { cn } from "@/utils/classMerge";

interface ITimeline {
  data: {
    date: string;
    title: string;
    company: string;
    description: string;
  };
  index: number;
}

const TimelineItem = ({ data, index }: ITimeline) => {
  const isLeft = index % 2 === 0;

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <div className="relative flex justify-center">
      {/* Kolom Kiri */}
      <div className={`w-1/2 ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}>
        {!isLeft && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={contentVariants}
          >
            <h3 className="font-bold text-lg text-black dark:text-dark-text">{data.title}</h3>
            <p className="font-semibold text-green dark:text-green-light mb-1">{data.company}</p>
            <p className="text-sm text-black/70 dark:text-dark-text-muted">{data.description}</p>
          </motion.div>
        )}
      </div>

      {/* Titik & Tanggal di Tengah */}
      <div className="flex-shrink-0 w-24 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={dotVariants}
        >
          <div className="bg-primary dark:bg-dark-card p-2 rounded-full shadow-md">
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                index === 0
                  ? "bg-gold animate-pulse ring-4 ring-gold/30"
                  : "bg-green/50 dark:bg-green-light/50"
              )}
            ></div>
          </div>
        </motion.div>
        <p className="mt-2 text-xs text-center font-semibold text-black/60 dark:text-dark-text-muted whitespace-nowrap">
          {data.date}
        </p>
      </div>

      {/* Kolom Kanan */}
      <div className={`w-1/2 ${isLeft ? "pl-8 text-left" : "pr-8 text-right"}`}>
        {isLeft && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={contentVariants}
          >
            <h3 className="font-bold text-lg text-black dark:text-dark-text">{data.title}</h3>
            <p className="font-semibold text-green dark:text-green-light mb-1">{data.company}</p>
            <p className="text-sm text-black/70 dark:text-dark-text-muted">{data.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function Timeline() {
  const t = useTranslations("timeline");

  const timelineData = [
    {
      date: t("items.maybank.date"),
      title: t("items.maybank.title"),
      company: t("items.maybank.company"),
      description: t("items.maybank.description"),
    },
    {
      date: t("items.telkom.date"),
      title: t("items.telkom.title"),
      company: t("items.telkom.company"),
      description: t("items.telkom.description"),
    },
    {
      date: t("items.cronos.date"),
      title: t("items.cronos.title"),
      company: t("items.cronos.company"),
      description: t("items.cronos.description"),
    },
    {
      date: t("items.telkomsigma.date"),
      title: t("items.telkomsigma.title"),
      company: t("items.telkomsigma.company"),
      description: t("items.telkomsigma.description"),
    },
    {
      date: t("items.infosys.date"),
      title: t("items.infosys.title"),
      company: t("items.infosys.company"),
      description: t("items.infosys.description"),
    },
  ];

  return (
    <section className="bg-primary dark:bg-dark-bg py-24 transition-colors duration-300" id="experience">
      <Page>
        <motion.div
          className="w-full text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-7xl text-green dark:text-green-light mb-4 ${thesignature.className}`}>
            {t("title")}
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black dark:text-dark-text ${unbounded.className}`}
          >
            {t("subtitle")}
          </h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Garis Vertikal */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-green/10 rounded-full transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem data={item} key={index} index={index} />
            ))}
          </div>
        </div>
      </Page>
    </section>
  );
}
