// components/landing/LandingPage.tsx
import { LandingPageData } from "@/types/landing-page";
import ImagesGrid from "./ImagesGrid";
import FullWidthSection from "./FullWidthSection";

interface LandingPageProps {
  data: LandingPageData;
}

export default function LandingPage({ data }: LandingPageProps) {
  return (
    <main className="min-h-screen">
      {data.blocks.map((block) => {
        switch (block.__component) {
          case "landing-page.images-grid":
            return <ImagesGrid key={block.id} block={block} />;
          case "landing-page.image-item":
            return <FullWidthSection key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </main>
  );
}