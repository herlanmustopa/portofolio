"use client"; // Tambahkan ini di baris paling atas jika belum ada
import { useState } from "react"; // Impor useState
import Banner from "@/components/templates/banner";
import Expertice from "@/components/templates/expertice";
import Projects from "@/components/templates/projects";
import About from "@/components/templates/about";
import Timeline from "@/components/templates/timeline";
import Contact from "@/components/templates/contact";
import ArticlePreview from "@/components/templates/articlePreview";
import Footer from "@/components/organisms/footer";
import Navbar from "@/components/organisms/navbar"; // Impor Navbar
import ContactModal from "@/components/organisms/contactModal"; // Impor Modal

export default function Home() {
  // State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Navbar sekarang menerima prop untuk membuka modal */}
      <Navbar onContactClick={() => setIsModalOpen(true)} />

      <main>
        <Banner />
        <Expertice />
        <Projects />
        <About />
        <Timeline />
        <ArticlePreview />
        <Contact />
      </main>
      <Footer />

      {/* Render modal di sini */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
