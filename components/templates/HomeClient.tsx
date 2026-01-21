"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Banner from "@/components/templates/banner";
import Navbar from "@/components/organisms/navbar";

// Dynamic imports for below-fold components to reduce main-thread work
const Expertice = dynamic(() => import("@/components/templates/expertice"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/templates/projects"), {
  ssr: false,
});
const About = dynamic(() => import("@/components/templates/about"), {
  ssr: false,
});
const Timeline = dynamic(() => import("@/components/templates/timeline"), {
  ssr: false,
});
const Testimonials = dynamic(
  () => import("@/components/templates/Testimonials"),
  { ssr: false }
);
const ArticleSection = dynamic(
  () => import("@/components/templates/ArticleSection"),
  { ssr: false }
);
const Contact = dynamic(() => import("@/components/templates/contact"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/organisms/footer"), {
  ssr: false,
});
const ContactModal = dynamic(
  () => import("@/components/organisms/contactModal"),
  { ssr: false }
);

interface Article {
  _id: string;
  title: string;
  imageUrl: string | null;
  slug: string;
  description: string;
}

interface HomeClientProps {
  articles: Article[];
}

export default function HomeClient({ articles }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar onContactClick={() => setIsModalOpen(true)} />

      <main>
        <Banner />
        <Expertice />
        <Projects />
        <About onContactClick={() => setIsModalOpen(true)} />
        <Timeline />
        <Testimonials />
        <ArticleSection articles={articles} />
        <Contact />
      </main>
      <Footer />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

