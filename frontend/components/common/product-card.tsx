"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/global";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Helper function to get full image URL
  const getImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) return "/placeholder-product.jpg";

    // If it's already a full URL, return as is
    if (imageUrl.startsWith("http")) return imageUrl;

    // Otherwise, prepend Strapi base URL
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    return `${baseUrl}${imageUrl}`;
  };

  // Always use the first variant for display (don't change image on color selection)
  const currentVariant = product.product_variants?.[0] || {
    color: { name: "Default", color_code: "#000000" },
    images: [],
  };

  // Get images for current variant or use placeholder
  const images = currentVariant.images || [];
  const primaryImage = getImageUrl(images[0]?.url);
  const secondaryImage = getImageUrl(images[1]?.url) || primaryImage;

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  // Get available colors from API response
  const availableColors =
    product.product_variants?.map((variant) => ({
      color: variant.color?.name || "Default",
      hex: variant.color?.color_code || "#000000",
    })) || [];

  // Get available sizes from first variant with stock quantity check
  const availableSizes =
    currentVariant.sizes?.map((sizeItem) => ({
      name: sizeItem.size?.name || "",
      stockQuantity: sizeItem.stock_quantity || 0,
      isOutOfStock: (sizeItem.stock_quantity || 0) === 0,
    })) || [];

  // Helper function to generate product URL with specific color
  const generateProductUrl = () => {
    const baseSlug = product.slug;
    const gender = product.category?.gender || "";

    return `/products/${gender}-${baseSlug}`;
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Get product name with default color
  const getProductNameWithColor = () => {
    const defaultColor = currentVariant.color?.name;
    if (defaultColor && defaultColor !== "Default") {
      return `${product.name} - ${defaultColor}`;
    }
    return product.name;
  };

  return (
    <Card
      className="group relative overflow-hidde bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        {/* Product Images */}
        <Link href={generateProductUrl()}>
          <div className="relative w-full h-full">
            <Image
              src={
                imageError
                  ? "/placeholder-product.jpg"
                  : isHovered
                  ? secondaryImage
                  : primaryImage
              }
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={handleImageError}
              priority={true} // Always prioritize first variant
            />
          </div>
        </Link>

        {/* Quick Add Button */}
        {isHovered && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              size="sm"
              className="bg-black text-white border border-black border-3 hover:bg-transparent hover:text-black py-5 px-4 rounded-full"
            >
              + Quick Add
            </Button>
          </div>
        )}
      </div>

      <CardContent className="">
        {/* Product Name with Color and Price in same line */}
        <div className="flex items-center justify-between">
          <Link href={generateProductUrl()}>
            <h3 className="text-sm font-bold text-black line-clamp-1">
              {getProductNameWithColor()}
            </h3>
          </Link>
          <p className="text-md font-semibold text-[#767676]">
            {formatPrice(product.base_price)}
          </p>
        </div>

        {/* Color Options and Sizes in same line */}
        <div className="flex items-center justify-between mt-2">
          {/* Color Options - Removed borders */}
          {availableColors.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {availableColors.slice(0, 4).map((colorOption, index) => (
                  <Link key={index} href={generateProductUrl()}>
                    <button
                      className="w-4 h-4 rounded-full cursor-pointer"
                      style={{ backgroundColor: colorOption.hex }}
                      title={colorOption.color}
                    />
                  </Link>
                ))}
                {availableColors.length > 4 && (
                  <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-600">+</span>
                  </div>
                )}
              </div>
              <span className="text-sm text-[#767676] border border-[#E5E5E5] rounded-full border-2 px-2 py-1">
                +{availableColors.length} Color
                {availableColors.length > 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Size indicators with stock quantity check */}
          {availableSizes.length > 0 && (
            <div className="flex gap-1">
              {availableSizes.map((sizeInfo, index) => (
                <span
                  key={index}
                  className={`text-xs px-1 py-0.5 ${
                    sizeInfo.isOutOfStock
                      ? "text-[#F1F1F1] line-through"
                      : "text-[#767676]"
                  }`}
                  title={
                    sizeInfo.isOutOfStock
                      ? "Out of stock"
                      : `${sizeInfo.stockQuantity} in stock`
                  }
                >
                  {sizeInfo.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
