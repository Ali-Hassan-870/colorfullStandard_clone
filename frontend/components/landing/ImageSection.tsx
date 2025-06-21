// components/landing/ImageSection.tsx
import Image from "next/image";
import Link from "next/link";
import { ImageSection as ImageSectionType } from "@/types/landing-page";
import Slideshow from "@/components/landing/SlideShow";

interface ImageSectionProps {
  section: ImageSectionType;
  className?: string;
}

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Helper function to get the correct image URL
const getImageUrl = (imageUrl: string) => {
  // Handle undefined or null imageUrl
  if (!imageUrl) {
    return '';
  }
  
  // Convert to string and trim whitespace
  const cleanUrl = String(imageUrl).trim();
  
  
  
  // If the image URL is already a full URL, return it as is
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl;
  }
  
  // For relative URLs (localhost development), prepend the base URL
  const fullUrl = `${STRAPI_BASE_URL}${cleanUrl}`;
  return fullUrl;
};

export default function ImageSection({ section, className = "" }: ImageSectionProps) {
  const { headline, title, images, buttons, is_slides_show, autoplay_delay } = section;

  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      {/* Background Image/Slideshow */}
      <div className="absolute inset-0">
        {is_slides_show && images.length > 1 ? (
          <Slideshow images={images} autoplayDelay={autoplay_delay} />
        ) : (
          images.length > 0 && (
            <Image
              src={getImageUrl(images[0].url)}
              alt=""
              fill
              className="object-cover"
              priority
            />
          )
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
        <div className="space-y-4">
          <p className="text-sm font-medium tracking-widest uppercase opacity-90">
            {headline}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
            {title}
          </h2>
          <div className="flex flex-wrap gap-4 pt-4">
            {buttons.map((button) => (
              <Link
                key={button.id}
                href={button.url}
                className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}