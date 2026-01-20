"use client";
import { useState } from "react";
import Banner from "@/components/templates/banner";
import Expertice from "@/components/templates/expertice";
import Projects from "@/components/templates/projects";
import About from "@/components/templates/about";
import Timeline from "@/components/templates/timeline";
import Contact from "@/components/templates/contact";
import ArticleSection from "@/components/templates/ArticleSection";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar";
import ContactModal from "@/components/organisms/contactModal";

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
