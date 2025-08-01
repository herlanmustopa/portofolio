"use client";
import { albert_Sans, thesignature, unbounded } from "@/utils/font";
import Page from "../organisms/pages";
import Button from "../molecules/button";
import Image from "next/image";
import Personal from "../../public/img/react.png";
import Exclusive from "../../public/img/react.png";
import Best from "../../public/img/react.png";
import Discover from "../../public/img/react.png";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface IAnimatedCard {
  src: any;
  alt: string;
  title: string;
  description: string;
}

function AnimatedCard({ src, alt, title, description }: IAnimatedCard) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center text-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
    >
      <Image src={src} alt={alt} width={100} height={100} />
      <div
        className={`uppercase text-green font-bold mt-4 ${albert_Sans.className}`}
      >
        {title}
      </div>
      <p className={`text-md text-black mt-2 ${albert_Sans.className}`}>
        {description}
      </p>
    </motion.div>
  );
}

export default function Expertice() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="bg-primary py-20" id="expertice">
      <Page className="flex flex-col items-center justify-center h-full text-white">
        <motion.div
          ref={ref}
          className="my-10 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } }, // Memberi jeda antar animasi anak
          }}
        >
          <motion.h1
            className={`text-7xl group:items-start text-green mb-4 ${thesignature.className}`}
            variants={itemVariants}
          >
            Beyond Premium
          </motion.h1>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-12 text-black ${unbounded.className}`}
            variants={itemVariants}
          >
            Elevate Your Experience
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
            <AnimatedCard
              src={Personal}
              alt="Personal Itineraries"
              title="PERSONAL ITINERARIES"
              description="Our premium travel services offer tailor-made itineraries crafted to suit your unique preferences and desires."
            />
            <AnimatedCard
              src={Exclusive}
              alt="Exclusive Experiences"
              title="EXCLUSIVE EXPERIENCES"
              description="From private charters to behind-the-scenes tours, we offer access to unique opportunities that are designed to elevate your trip to the next level."
            />
            <AnimatedCard
              src={Best}
              alt="Best Facilities"
              title="Best Facilities"
              description="Experience the epitome of luxury with our premium facility, designed to provide an unparalleled level of comfort and indulgence."
            />
          </div>
        </motion.div>

        {/* Anda dapat menerapkan pola yang sama untuk bagian "Discover" di bawah ini jika diinginkan */}
        <div className="my-10 text-center">
          <div className="flex lg:flex-row flex-col items-center justify-center gap-8">
            <Image src={Discover} alt="Discover" width={302} height={302} />
            <div className="lg:w-3/5 md:w-3/5 sm:w-full xs:w-full items-start lg:text-start text-center">
              <p
                className={`uppercase text-green-80 font-bold text-2xl ${unbounded.className}`}
              >
                Discover Tailored Experiences
              </p>
              <h1
                className={`text-md text-black mt-2 ${albert_Sans.className}`}
              >
                Create your own journey, personalized to suit your preferences
                and interests, ensuring a once-in-a-lifetime adventure awaits.
              </h1>
              <Button
                text="Customize Your Trip"
                className={`${albert_Sans.className} my-10 bg-green-80 hover:bg-gold font-bold lg:w-64 xs:w-full`}
              />
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
}
