"use client";

import { useState, ReactNode } from "react";
import Navbar from "@/components/organisms/navbar";
import Footer from "@/components/organisms/footer";
import ContactModal from "@/components/organisms/contactModal";

interface BlogLayoutClientProps {
    children: ReactNode;
}

export default function BlogLayoutClient({ children }: BlogLayoutClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Navbar onContactClick={() => setIsModalOpen(true)} />
            {children}
            <Footer />
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
