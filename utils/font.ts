import {Albert_Sans, Unbounded} from "next/font/google";
import localFont from "next/font/local";

export const thesignature = localFont({
  src: "../public/font/Thesignature.otf",
  display: "swap",
});
export const albert_Sans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
});
