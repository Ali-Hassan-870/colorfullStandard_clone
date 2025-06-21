// components/landing/FullWidthSection.tsx
import Image from "next/image";
import Link from "next/link";
import { ImageItemBlock } from "@/types/landing-page";

interface FullWidthSectionProps {
  block: ImageItemBlock;
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

export default function FullWidthSection({ block }: FullWidthSectionProps) {
  const { headline, title, buttons, images } = block;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {images && images.length > 0 ? (
          <Image
            src={getImageUrl(images[0].url)}
            alt=""
            fill
            className="object-cover"
            priority
          />
        ) : (
          // Fallback background when no images provided
          <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-600" />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-16 text-white">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium tracking-widest uppercase opacity-90">
            {headline}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            {title}
          </h2>
          <div className="flex flex-wrap gap-4 pt-6">
            {buttons.map((button) => (
              <Link
                key={button.id}
                href={button.url}
                className="bg-white text-black px-8 py-4 rounded-full font-medium text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
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