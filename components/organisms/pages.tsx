import React from "react";

interface IPage {
  children: React.ReactNode;
  className?: string;
}
export default function Page({children, className}: IPage) {
  return (
    <div className={`xs:mx-20 md:mx-24 sm:mx-20 lg:mx-32  ${className}`}>
      {children}
    </div>
  );
}
