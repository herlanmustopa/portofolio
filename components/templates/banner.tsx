import React from "react";
import { albert_Sans, unbounded } from "@/utils/font";
import Button from "../molecules/button";
import Page from "../organisms/pages";

export default function Banner() {
  return (
    <section
      id="banner"
      className="relative h-screen bg-[#001f3f]" // navy background
    >
      <Page
        className="
          relative z-10 flex flex-col items-start justify-center h-full text-white
        "
      >
        <div>
          <h1 className={`text-9xl text-gold mb-4 ${unbounded.className} `}>
            Herlan Mustopa
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 ${unbounded.className}`}
          >
            Elevating Every Interaction
          </h2>
          <p
            className={`text-base md:text-lg lg:text-xl max-w-2xl ${albert_Sans.className}`}
          >
            Imagine a digital journey where each moment feels tailor-made:
            seamless, inviting, and unexpectedly delightful. From the first
            glance to the final click, I sculpt experiences that immerse you in
            clarity and elegance—transforming every visit into a memorable
            adventure, crafted just for you
          </p>
          <Button
            text="Take me there"
            className={`${albert_Sans.className} my-10 hover:bg-gold border-2 font-bold`}
          />
        </div>
      </Page>
    </section>
  );
}
