"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { albert_Sans, unbounded } from "@/utils/font";


interface IContact{
    icon: string;
    title: string;
    value: any;
    href: any;
}

const ContactLink = ({ icon, title, value, href }: IContact) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const isEmail = title === "Email";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={
        isEmail
          ? (e) => {
              e.preventDefault();
              handleCopy();
            }
          : undefined
      }
      className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors duration-300 group"
    >
      <span className="text-3xl mr-4">{icon}</span>
      <div className="flex-grow">
        <p className={`font-bold text-white ${unbounded.className}`}>{title}</p>
        <p className={`text-white/70 ${albert_Sans.className}`}>{value}</p>
      </div>
      {isEmail && (
        <span className="text-sm font-semibold text-gold transition-opacity duration-300">
          {copied ? "Copied!" : "Copy"}
        </span>
      )}
      {!isEmail && (
        <span className="text-gold transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          →
        </span>
      )}
    </a>
  );
};


interface iModal{
    isOpen: any;
    onClose: any;
}
// Komponen utama Modal
export default function ContactModal({ isOpen, onClose }: iModal) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Jendela Modal */}
        <motion.div
          className="relative z-10 w-full max-w-lg p-8 bg-navy rounded-2xl shadow-2xl border border-white/10"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tombol Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            &times;
          </button>

          <h2
            className={`text-3xl font-bold text-white mb-2 ${unbounded.className}`}
          >
            Let's Connect
          </h2>
          <p className={`text-white/70 mb-8 ${albert_Sans.className}`}>
            Pilih cara yang paling nyaman bagi Anda untuk menghubungi saya.
          </p>

          <div className="space-y-4">
            <ContactLink
              icon="📧"
              title="Email"
              value="herlan.mustopa01@gmail.com"
              href="#"
            />
            <ContactLink
              icon="💬"
              title="WhatsApp"
              value="+62 811-9011-099"
              href="https://wa.me/628119011099"
            />
            <ContactLink
              icon="🔗"
              title="LinkedIn"
              value="Herlan Mustopa"
              href="https://www.linkedin.com/in/herlanmustopa/"
            />
            {/* <ContactLink
              icon="📂"
              title="Download CV"
              value="Lihat detail pengalaman saya"
              href="/CV Herlan 2025-EN.pdf"
            /> */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
