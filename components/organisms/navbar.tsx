"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/classMerge";
import Page from "./pages";
import { motion } from "framer-motion";
import ThemeToggle from "../molecules/ThemeToggle";
import LanguageSwitcher from "../molecules/LanguageSwitcher";

interface INavbar {
  onContactClick?: any;
}
const Navbar = ({ onContactClick }: INavbar) => {
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("banner");
  const t = useTranslations("nav");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScrollTo = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        behavior: "smooth",
        top: target.offsetTop - 100,
      });
    }
  };

  const handleScrollEffect = () => {
    const isScrolled = window.scrollY > 20;
    setScroll(isScrolled);

    const sections = ["banner", "expertice", "projects", "about", "article"];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEffect);
    return () => {
      window.removeEventListener("scroll", handleScrollEffect);
    };
  }, []);

  const menuItems = [
    { id: "banner", label: t("homepage") },
    { id: "expertice", label: t("expertise") },
    { id: "projects", label: t("projects") },
    { id: "about", label: t("about") },
    { id: "article", label: t("article") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-20 w-full transition-colors duration-300",
          scroll ? "bg-primary dark:bg-dark-bg" : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-full -z-10 bg-primary dark:bg-dark-bg transition-opacity duration-300 ease-in-out",
            scroll ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute top-full left-0 w-full h-12 pointer-events-none transition-opacity duration-300 ease-in-out",
            scroll ? "opacity-100" : "opacity-0"
          )}
        >
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L1440,0 L1440,20 C1080,50 720,10 360,40 C240,50 120,45 0,30 Z"
              className="fill-primary dark:fill-dark-bg transition-colors duration-300"
            />
          </svg>
        </div>

        <Page>
          <nav className="min-h-[6.25rem] justify-between flex items-center w-full py-5 sticky top-0 z-40">
            <div className="justify-between flex flex-wrap items-center w-full">
              {/* Mobile: Hamburger menu on left */}
              <div className="border border-green rounded-full md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
                  aria-controls="mega-menu-full"
                  aria-expanded={isMenuOpen}
                >
                  <span className="material-symbols-outlined text-green">
                    {isMenuOpen ? "close" : "menu"}
                  </span>
                </button>
              </div>

              {/* Mobile: Language switcher and Theme toggle on right side */}
              <div className="flex items-center gap-4 md:hidden">
                <LanguageSwitcher isScrolled={scroll} />
                <ThemeToggle />
              </div>

              {/* Desktop: Full width container with left menu and right actions */}
              <div
                id="mega-menu-full"
                className={`group items-center justify-between font-medium ${isMenuOpen ? "block" : "hidden"
                  } w-full md:flex`}
              >
                {/* LEFT SIDE: Menu Items */}
                <ul className="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse items-center">
                  {menuItems.map((item) => (
                    <li key={item.id} className="relative">
                      <button
                        onClick={() => handleScrollTo(item.id)}
                        className={cn(
                          "block rounded px-3 py-2 transition-colors duration-300 font-bold",
                          scroll ? "text-green dark:text-green-light" : "text-white",
                          activeSection === item.id
                            ? "opacity-100"
                            : "opacity-70 hover:opacity-100"
                        )}
                      >
                        {item.label}
                      </button>

                      {activeSection === item.id && (
                        <motion.div
                          className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gold"
                          layoutId="active-underline"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </li>
                  ))}
                </ul>

                {/* RIGHT SIDE: Language, Theme, Contact - Desktop only */}
                <div className="hidden md:flex items-center gap-4">
                  <LanguageSwitcher isScrolled={scroll} />
                  <ThemeToggle />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    className="rounded-full"
                    onClick={onContactClick}
                  >
                    <div className="relative rounded-full p-[2px] overflow-hidden group cursor-pointer">
                      <motion.div
                        className="absolute inset-0 w-full h-full -z-10"
                        style={{
                          background:
                            "conic-gradient(from 180deg at 50% 50%, #001f3f, #004040, #0b7373, #001f3f)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <div
                        className={cn(
                          "relative z-10 h-full w-full rounded-full px-4 py-2 font-bold transition-colors duration-300",
                          scroll
                            ? "bg-primary dark:bg-dark-bg text-green dark:text-green-light"
                            : "bg-navy text-white"
                        )}
                      >
                        {t("contactMe")}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile: Contact button in menu */}
                <div className="md:hidden flex justify-center mt-4 p-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    className="rounded-full"
                    onClick={onContactClick}
                  >
                    <div className="relative rounded-full p-[2px] overflow-hidden group cursor-pointer">
                      <motion.div
                        className="absolute inset-0 w-full h-full -z-10"
                        style={{
                          background:
                            "conic-gradient(from 180deg at 50% 50%, #001f3f, #004040, #0b7373, #001f3f)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <div
                        className={cn(
                          "relative z-10 h-full w-full rounded-full px-4 py-2 font-bold transition-colors duration-300",
                          scroll
                            ? "bg-primary dark:bg-dark-bg text-green dark:text-green-light"
                            : "bg-navy text-white"
                        )}
                      >
                        {t("contactMe")}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </nav>
        </Page>
      </header>

      <style jsx>{`
        .animated-border-container {
          position: relative;
          padding: 2px; /* Lebar border */
          border-radius: 9999px; /* rounded-full */
          overflow: hidden;
          cursor: pointer;
        }

        .animated-border-container::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          z-index: 1;
          background: conic-gradient(
            from 180deg at 50% 50%,
            #d6b66b,
            /* gold */ #0b7373,
            /* green */ #001f3f,
            /* navy */ #0b7373,
            /* green */ #d6b66b /* gold (diulang agar loop mulus) */
          );
          animation: spin 4s linear infinite;
        }

        .animated-border-content {
          position: relative;
          z-index: 2;
          display: block;
          padding: 0.5rem 1rem; /* py-2 px-4 */
          border-radius: 9999px;
          transition: background-color 0.3s ease;
          font-weight: 700;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
