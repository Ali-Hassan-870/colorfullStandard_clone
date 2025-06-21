// components/layout/Footer.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { GlobalData } from "@/types/global";
import { getGlobalData } from "@/lib/api";

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Helper function to get the correct image URL (same as ImageSection)
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

const Footer: React.FC = () => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGlobalData();
        setGlobalData(data);
      } catch (error) {
        console.error("Error fetching global data in Footer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div
                        key={j}
                        className="h-3 bg-gray-100 rounded w-24"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!globalData) {
    return null;
  }

  const { footer } = globalData;

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter submission logic here
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Newsletter signup:", email);
  };

  return (
    <footer className="bg-white my-6">
      <div className="max-w-full mx-auto px-6 sm:px-9 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Footer Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 flex-1">
              {footer.sections.map((section) => (
                <div key={section.id} className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.id}>
                        {link.is_external ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.url}
                            className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-md space-y-4">
              <h3 className="font-semibold text-gray-900 text-2xl">
                {footer.newsletter.title}
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder={footer.newsletter.placeholder}
                    required
                    className="w-full p-6 pr-14 border-gray-300 focus:border-black focus:border-2"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute text-black rounded-full right-6 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-[#E2E2E2] hover:bg-black hover:text-white"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </form>
              <p className="text-xs text-gray-500 leading-relaxed">
                {footer.newsletter.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Side - Dropdowns and Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Copyright */}
              <p className="text-sm text-gray-500">© 2025, Colorful Standard</p>
            </div>

            {/* Right Side - Payment Methods */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                {footer.payment_cards.map((card) => (
                  <div
                    key={card.id}
                    className="relative h-6 w-auto flex-shrink-0"
                    style={{ minWidth: "32px" }}
                  >
                    <Image
                      src={getImageUrl(card.logo.url)}
                      alt={card.name}
                      width={40}
                      height={24}
                      className="h-6 w-auto object-contain"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      priority={false}
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load image: ${getImageUrl(card.logo.url)}`);
                        // Optional: Set a placeholder image
                        // e.currentTarget.src = '/placeholder-payment.png';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;