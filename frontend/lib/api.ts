import { ApiResponse, GlobalData } from '@/types/global';
import { ProductApiResponse } from '@/types/product';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getGlobalData(): Promise<GlobalData | null> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/global`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    return null;
  }
}

export async function fetchProductsByCategory(
    categorySlug: string,
    gender: string,
    page: number = 1,
    pageSize: number = 25
  ): Promise<ProductApiResponse> {
    try {
      const url = new URL(`${STRAPI_BASE_URL}/api/products`);
      
      // Add filters
      url.searchParams.append('filters[category][slug][$eq]', categorySlug);
      url.searchParams.append('filters[category][gender][$eq]', gender);
      
      // Add pagination
      url.searchParams.append('pagination[page]', page.toString());
      url.searchParams.append('pagination[pageSize]', pageSize.toString());
      
      // Populate relations
      url.searchParams.append('populate[category]', 'true');
      url.searchParams.append('populate[product_variants][populate][images]', 'true');
      
      const response = await fetch(url.toString(), {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }
  