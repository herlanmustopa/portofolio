"use client";

import {useState, useEffect} from "react";
import Image from "next/image";

interface Slide {
  id: string;
  src: string;
  gallery_alt_text: string;
}

interface BannerProps {
  slides: Slide[];
}

export default function CarouselBanner({slides}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    handleData();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleData = () => {
    const datas: any[] = [];
    slides.map((item: Slide, i: number) => {
      console.log(item);
      datas.push({
        id: item.id,
        image: item?.src,
        judul: item?.gallery_alt_text,
      });
    });
    setData(datas);
  };
  return (
    <div className='relative w-full'>
      <div className={`relative h-60 overflow-hidden sm:h-80`}>
        {data?.map((slide: any, index: number) => (
          <>
            <div
              key={index}
              className={`absolute h-full w-full transition-opacity duration-700 ease-in-out `}
              style={{
                opacity: index === currentIndex ? 100 : 0,
              }}>
              <Image
                src={slide?.image}
                quality={100}
                fill
                alt={`Slide ${index + 1} ${slide.judul}`}
                style={{objectFit: "cover", objectPosition: "center"}}
                className='object-cover'
                sizes='100vw'
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
