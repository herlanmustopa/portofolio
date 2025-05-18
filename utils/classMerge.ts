import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...input: any) => {
  return twMerge(clsx(input));
};
