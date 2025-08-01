"use client";
import React from "react";
import { motion } from "framer-motion";
import Page from "../organisms/pages";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";

const timelineData = [
  {
    date: "Okt 2024 - Sekarang",
    title: "FullStack Developer",
    company: "Maybank",
    description: "Mengembangkan berbagai aplikasi web (M2U, BackOffice, Corporate) dan backend microservices menggunakan ReactJS, Java Springboot, dan CMS Sitecore.",
  },
  {
    date: "Feb 2023 - Okt 2024",
    title: "Sr. Frontend Web Developer",
    company: "Telkom",
    description: "Memimpin penulisan ulang Portal OSS ke V2 menggunakan Next.js & TypeScript. Membangun beberapa dashboard CMS dan portal internal dengan React dan Vue.",
  },
  {
    date: "Apr 2022 - Jan 2023",
    title: "Mid. Frontend Web Developer",
    company: "Cronos Studio Indonesia",
    description: "Membangun aplikasi MIS-BRIAPI Auto Debit untuk BRI menggunakan ReactJS dan Material UI, dengan fokus pada integrasi API dan state management Redux.",
  },
  {
    date: "Sep 2018 - Apr 2022",
    title: "Frontend Web Developer",
    company: "Telkomsigma",
    description: "Mengembangkan berbagai proyek untuk pemerintah dan enterprise seperti LPPD & EKPPD menggunakan Vue.js/Nuxt.js dan aplikasi internal dengan React.js.",
  },
    {
    date: "Jan 2017 - Sep 2018",
    title: "Mobile & Web Developer",
    company: "Infosys Integrated Solutions",
    description: "Terlibat dalam pembuatan aplikasi mobile Brimo BRI, My Indihome, dan My Telkom Solution, serta portal web untuk CIMB Niaga.",
  },
];

interface ITimeline{
    data: any;
    index: any;
}

const TimelineItem = ({ data, index }: ITimeline) => {
  const isLeft = index % 2 === 0;
  return (
    <div className="flex justify-between items-center w-full">
      {/* Kolom Kiri */}
      <div className={`w-5/12 ${isLeft ? "text-right" : ""}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className={`font-bold text-lg text-black ${unbounded.className}`}
            >
              {data.title}
            </h3>
            <p className="font-semibold text-green mb-1">{data.company}</p>
            <p className="text-sm text-black/70">{data.description}</p>
          </motion.div>
        )}
      </div>

      {/* Titik Tengah */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex items-center justify-center w-24"
      >
        <div className="bg-primary p-2 rounded-full shadow-md">
          <div className="bg-gold w-4 h-4 rounded-full"></div>
          <p
            className={`absolute mt-2 text-xs font-semibold text-black/60 ${albert_Sans.className}`}
          >
            {data.date}
          </p>
        </div>
      </motion.div>

      {/* Kolom Kanan */}
      <div className={`w-5/12 ${!isLeft ? "text-left" : ""}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className={`font-bold text-lg text-black ${unbounded.className}`}
            >
              {data.title}
            </h3>
            <p className="font-semibold text-green mb-1">{data.company}</p>
            <p className="text-sm text-black/70">{data.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function Timeline() {
  return (
    <section className="bg-primary py-24" id="experience">
      <Page>
        <motion.div
            className="w-full text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
          <h1 className={`text-7xl text-green mb-4 ${thesignature.className}`}>
            Career Journey
          </h1>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-black ${unbounded.className}`}>
            Milestones & Achievements
          </h2>
        </motion.div>

        <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-2 border-dashed border-green/30 rounded-full"></div>
            {timelineData.map((item, index) => (
                <TimelineItem data={item} key={index} index={index} />
            ))}
        </div>
      </Page>
    </section>
  );
}