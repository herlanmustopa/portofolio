import React from "react";

interface IPage {
  children: React.ReactNode;
  className?: string;
}
export default function Page({children, className}: IPage) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
