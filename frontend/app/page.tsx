// app/page.tsx
import { getLandingPageData } from "@/lib/landing-api";
import LandingPage from "@/components/landing/LandingPage";

export default async function HomePage() {
  try {
    const landingData = await getLandingPageData();
    
    return <LandingPage data={landingData.data} />;
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to load page
          </h1>
          <p className="text-gray-600">
            Please check your API connection and try again.
          </p>
        </div>
      </div>
    );
  }
}