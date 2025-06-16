// lib/landing-api.ts
import { LandingPageResponse } from "@/types/landing-page";

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export async function getLandingPageData(): Promise<LandingPageResponse> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/landing-page`, {
      next: { revalidate: 60 } // Revalidate every minute
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch landing page data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
}