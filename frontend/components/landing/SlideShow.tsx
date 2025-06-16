// components/landing/Slideshow.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Image as ImageType } from "@/types/landing-page";

interface SlideshowProps {
  images: ImageType[];
  autoplayDelay: number;
  className?: string;
}

export default function Slideshow({ images, autoplayDelay, className = "" }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1 || autoplayDelay === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplayDelay * 1000);

    return () => clearInterval(interval);
  }, [images.length, autoplayDelay]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={`http://localhost:1337${image.url}`}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}