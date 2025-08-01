"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/utils/classMerge";
import Page from "./pages";

const Navbar = () => {
  const [scroll, setScroll] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("banner");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({ behavior: "smooth", top: target.offsetTop - 100 });
    }
  };

  useEffect(() => {
    const handleScrollEffect = () => {
      const currentScroll = window.scrollY > 20;
      setScroll(currentScroll ? 1 : 0);

      const sections = ["banner", "expertice", "projects", "about", "article"];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollEffect);
    return () => {
      window.removeEventListener("scroll", handleScrollEffect);
    };
  }, []);

  const menuItems = [
    { id: "banner", label: "Homepage" },
    { id: "expertice", label: "Expertice" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "article", label: "Article" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-20 w-full transition-colors duration-300",
        scroll ? "bg-primary" : "bg-transparent"
      )}
    >
      <Page>
        <nav
          className={cn(
            "min-h-[6.25rem] justify-between flex items-center w-full py-5 sticky top-0 z-40 transition-all duration-500"
          )}
        >
          <div className="justify-between flex flex-wrap items-center w-full">
            <div className="border border-green rounded-full">
              <button
                onClick={toggleMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400"
                aria-controls="mega-menu-full"
                aria-expanded={isMenuOpen}
              >
                <span className="material-symbols-outlined text-green">
                  {isMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
            <div
              id="mega-menu-full"
              className={`group items-center justify-between font-medium ${
                isMenuOpen ? "block" : "hidden"
              } w-full md:order-1 md:flex md:w-auto`}
            >
              <ul className="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleScroll(item.id)}
                      className={cn(
                        "block rounded px-3 py-2 transition",
                        scroll
                          ? "lg:text-green sm:text-green font-bold"
                          : "text-white",
                        activeSection === item.id
                          ? "underline decoration-gold decoration-2 underline-offset-4" 
                          : "hover:underline decoration-gold decoration-2 underline-offset-4"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className={cn(
                      "border px-4 py-2 rounded-full transition hover:bg-gold hover:text-navy",
                      scroll
                        ? "text-green border-green font-bold"
                        : "text-white border-gold"
                    )}
                  >
                    Need Contact Me?
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Page>
    </header>
  );
};

export default Navbar;
