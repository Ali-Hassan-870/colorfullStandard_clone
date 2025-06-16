// components/landing/ImagesGrid.tsx
import { ImagesGridBlock } from "@/types/landing-page";
import ImageSection from "./ImageSection";

interface ImagesGridProps {
  block: ImagesGridBlock;
}

export default function ImagesGrid({ block }: ImagesGridProps) {
  const { left, right } = block;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Left Section */}
      <ImageSection section={left} />
      
      {/* Right Section */}
      {right.map((section) => (
        <ImageSection key={section.id} section={section} />
      ))}
    </div>
  );
}