"use client";
import Image from "next/image";
// import Logo from "../../../public/img/logo.svg";
// import Logo_Colors from "../../../public/img/logo_colors.svg";
import { useEffect, useState } from "react";
import { cn } from "@/utils/classMerge";
import Page from "./pages";

const Navbar = () => {
  const [scroll, setScroll] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleScroll = (targetId: string) => {
    switch (targetId) {
      case "article":
        break;
      case "luxury":
        break;
      case "banner":
        break;
      default:
        console.error(`No handler for ${targetId}`);
    }

    let target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({ behavior: "smooth", top: target.offsetTop - 100 });
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const currentScroll = scroll > 0;
      const scrollCheck = window.scrollY > 20;
      if (scrollCheck !== currentScroll) {
        setScroll(scrollCheck ? 1 : 0);
      }
    });
  });

  return (
    <header
      className={cn(
        `fixed top-0 left-0 z-20 w-full `,
        scroll ? "bg-primary" : "bg-transparent"
      )}
    >
      <Page>
        <nav
          className={cn(
            "min-h-[6.25rem] justify-between flex items-center w-full py-5 sticky top-0 z-40 lg:bg-transparent md:bg-transparent sm:bg-transparent xs:bg-transparent lg:text-white sm:text-green transition-all duration-500"
          )}
        >
          <div className="justify-between flex flex-wrap items-center w-full">
            <div
              className="
              border
              border-green
              rounded-full 
            "
            >
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
              <ul className="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0  md:p-0 rtl:space-x-reverse">
                <li>
                  <button
                    onClick={() => handleScroll("banner")}
                    className={`block rounded px-3 py-2 hover:underline transition ${
                      scroll
                        ? "lg:text-green sm:text-green font-bold "
                        : "text-white"
                    }`}
                    aria-current="page"
                  >
                    Homepage
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("custome-trip")}
                    className={`block rounded px-3 py-2 hover:underline transition ${
                      scroll
                        ? "lg:text-green sm:text-green font-bold "
                        : "text-white"
                    }`}
                  >
                    Expertice
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("custome-trip")}
                    className={`block rounded px-3 py-2 hover:underline transition ${
                      scroll
                        ? "lg:text-green sm:text-green font-bold "
                        : "text-white"
                    }`}
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("destination")}
                    className={`block rounded px-3 py-2 hover:underline transition ${
                      scroll
                        ? "lg:text-green sm:text-green font-bold "
                        : "text-white"
                    }`}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScroll("article")}
                    className={`block rounded px-3 py-2 hover:underline transition ${
                      scroll
                        ? "lg:text-green sm:text-green font-bold"
                        : "text-white"
                    }`}
                  >
                    Article
                  </button>
                </li>
                <li>
                  <button
                    className={`border border-teal-700  px-4 py-2 rounded-full  transition  hover:bg-green-80 hover:text-white ${
                      scroll
                        ? "text-green border-green font-bold"
                        : "text-white"
                    }`}
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
