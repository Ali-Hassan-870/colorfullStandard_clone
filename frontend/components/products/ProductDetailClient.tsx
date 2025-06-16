"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Faq } from "@/components/ui/faq";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product, Color } from "@/types/product";
import { getImageUrl } from "@/lib/api/products";

interface ProductPageClientProps {
  product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedColorId, setSelectedColorId] = useState<number>(
    product.product_variants[0]?.color.id
  );
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);

  // Get unique colors from variants
  const availableColors = product.product_variants.reduce((acc, variant) => {
    if (!acc.find((color) => color.id === variant.color.id)) {
      acc.push(variant.color);
    }
    return acc;
  }, [] as Color[]);

  // Get available sizes for selected color
  const selectedVariant = product.product_variants.find(
    (variant) => variant.color.id === selectedColorId
  );

  const availableSizes =
    selectedVariant?.sizes
      .reduce((acc, sizeItem) => {
        const existingSize = acc.find((s) => s.id === sizeItem.size.id);
        if (existingSize) {
          existingSize.stock_quantity += sizeItem.stock_quantity;
        } else {
          acc.push({
            id: sizeItem.size.id,
            name: sizeItem.size.name,
            display_order: sizeItem.size.display_order,
            stock_quantity: sizeItem.stock_quantity,
          });
        }
        return acc;
      }, [] as Array<{ id: number; name: string; display_order: number; stock_quantity: number }>)
      .sort((a, b) => a.display_order - b.display_order) || [];

  // Get current price
  const currentPrice = selectedVariant?.price_override || product.base_price;

  // Get selected size stock
  const selectedSizeStock =
    selectedVariant?.sizes
      .filter((sizeItem) => sizeItem.size.id === selectedSizeId)
      .reduce((total, sizeItem) => total + sizeItem.stock_quantity, 0) || 0;

  // Get images for selected color
  const selectedColorImages = selectedVariant?.images || [];

  const handleColorChange = (colorId: number) => {
    setSelectedColorId(colorId);
    setSelectedSizeId(null); // Reset size selection when color changes
    setQuantity(1); // Reset quantity when color changes
  };

  const handleSizeChange = (sizeId: number) => {
    setSelectedSizeId(sizeId);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= selectedSizeStock) {
      setQuantity(newQuantity);
    }
  };

  const canAddToCart =
    selectedColorId &&
    selectedSizeId &&
    quantity > 0 &&
    quantity <= selectedSizeStock;

  const handleAddToCart = () => {
    if (!selectedSizeId) {
      setShowSizeError(true);
      return;
    }

    if (canAddToCart) {
      setShowSizeError(false);
      console.log("Adding to cart:", {
        productId: product.id,
        variantId: selectedVariant?.id,
        colorId: selectedColorId,
        sizeId: selectedSizeId,
        quantity,
        price: currentPrice,
      });
    }
  };
  // Prepare FAQ items
  const faqItems = [
    ...(product.product_info
      ? [
          {
            id: "product-info",
            question: "Product Information",
            answer: product.product_info,
          },
        ]
      : []),
    ...(product.care_instruction
      ? [
          {
            id: "care-instructions",
            question: "Care Instructions",
            answer: product.care_instruction,
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      {/* Images Section - 60% width */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-2 gap-6">
          {selectedColorImages.length > 0 ? (
            selectedColorImages.map((image, index) => (
              <div key={index} className="w-full">
                <Image
                  src={getImageUrl(image.url)}
                  alt={`${product.name} - ${
                    selectedVariant?.color.name
                  } - Image ${index + 1}`}
                  width={600} // or any suitable width
                  height={800} // keep aspect ratio similar to image
                  className="object-contain w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
              </div>
            ))
          ) : (
            // Placeholder when no images are available
            <Card className="overflow-hidden col-span-2">
              <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Product Details Section - 40% width */}
      <div className="lg:col-span-2">
        <div className="sticky top-8 space-y-8">
          {/* Product Name */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.name} -{" "}
              {availableColors.find((c) => c.id === selectedColorId)?.name}
            </h1>
          </div>

          {/* Price */}
          <div className="text-lg  text-gray-900">
            €{currentPrice}
            <span className="text-xs font-normal text-gray-500 ml-2">
              Tax included.
            </span>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-700">Color: </span>
              <span className="text-xs text-gray-600">
                {availableColors.find((c) => c.id === selectedColorId)?.name}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {availableColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={`w-6 h-6 cursor-pointer rounded-full border-2 ${
                    selectedColorId === color.id
                      ? "border-gray-900 shadow-lg scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.color_code }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs ${
                  showSizeError && !selectedSizeId
                    ? "text-[#B01111]"
                    : "text-gray-700"
                }`}
              >
                Size:{" "}
                {selectedSizeId
                  ? availableSizes.find((s) => s.id === selectedSizeId)?.name
                  : showSizeError
                  ? "Please select a size"
                  : ""}
              </span>
              <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                📏 Size Guide
              </Button>
            </div>

            <div className="grid grid-cols-9 gap-2">
              {availableSizes.map((size) => {
                const isOutOfStock = size.stock_quantity === 0;
                const isSelected = selectedSizeId === size.id;

                return (
                  <div key={size.id} className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSizeId(size.id);
                        setShowSizeError(false);
                      }}
                      className={`h-12 w-12 rounded-full text-sm border-3 ${
                        isSelected
                          ? "border-black"
                          : showSizeError
                          ? "border-[#B01111]"
                          : "border-gray-300"
                      } ${
                        isOutOfStock ? "opacity-50 bg-gray-100" : "bg-white"
                      }`}
                    >
                      {size.name}
                    </Button>
                    {isOutOfStock && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="w-[80%] h-[2px] bg-gray-700 rotate-45 rounded-sm" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity and Add to Cart in same row */}
          <div className="flex items-center space-x-4">
            {/* Quantity */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-14 w-12 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="py-3 text-center min-w-[3rem]">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= selectedSizeStock}
                className="h-14 w-12 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={
                selectedSizeId && selectedSizeStock === 0
                  ? undefined
                  : handleAddToCart
              }
              className={`
                flex-1 h-14 font-bold rounded-full border-3
                ${
                  selectedSizeId && selectedSizeStock === 0
                    ? "bg-[#F1F1F1] text-black cursor-not-allowed border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black hover:border-[#F1F1F1]"
                    : "bg-black text-white hover:bg-white hover:text-black border-black"
                }
              `}
            >
              {selectedSizeId && selectedSizeStock === 0
                ? "Sold Out"
                : "Add to cart"}
            </Button>
          </div>

          {/* Notify Me Below Add to Cart */}
          {selectedSizeId && selectedSizeStock === 0 && (
            <Button
              className="w-full h-14 bg-black text-white font-bold rounded-full border-3 border-black hover:bg-white hover:text-black"
              onClick={() =>
                console.log("Notify me clicked for size", selectedSizeId)
              }
            >
              NOTIFY ME WHEN AVAILABLE
            </Button>
          )}

          {/* FAQ Section */}
          <div className="border-t pt-8">
            <Faq items={faqItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
