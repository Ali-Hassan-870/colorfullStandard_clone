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

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Helper function to get the correct image URL
const getImageUrl = (imageUrl: string) => {
  // Handle undefined or null imageUrl
  if (!imageUrl) {
    return '';
  }
  
  // If the image URL is already a full URL, return it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // For relative URLs (localhost development), prepend the base URL
  return `${STRAPI_BASE_URL}${imageUrl}`;
};

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
            src={getImageUrl(image.url)}
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