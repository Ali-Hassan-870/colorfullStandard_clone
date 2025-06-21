import { Product, ProductApiResponse } from '@/types/product'

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

export async function fetchProduct(slug: string, gender: string): Promise<Product | null> {
  try {
    const url = new URL(`${API_BASE_URL}/api/products`)
    url.searchParams.set('filters[slug][$eq]', slug)
    url.searchParams.set('filters[category][gender][$eq]', gender)
    url.searchParams.set('populate', '*')

    const response = await fetch(url.toString(), {
      next: { 
        revalidate: 300, 
        tags: [`product-${slug}-${gender}`]
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch product: ${response.status} ${response.statusText}`)
      return null
    }

    const data: ProductApiResponse = await response.json()
    return data.data[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}


export async function fetchProducts(filters: {
  gender?: string
  category?: string
  page?: number
  pageSize?: number
}): Promise<{ products: Product[]; meta: any }> {
  try {
    const url = new URL(`${API_BASE_URL}/api/products`)
    
    if (filters.gender) {
      url.searchParams.set('filters[category][gender][$eq]', filters.gender)
    }
    
    if (filters.category) {
      url.searchParams.set('filters[category][slug][$eq]', filters.category)
    }
    
    url.searchParams.set('populate', '*')
    url.searchParams.set('pagination[page]', (filters.page || 1).toString())
    url.searchParams.set('pagination[pageSize]', (filters.pageSize || 25).toString())

    const response = await fetch(url.toString(), {
      next: { 
        revalidate: 300,
        tags: ['products-list']
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`)
    }

    const data: ProductApiResponse = await response.json()
    return {
      products: data.data,
      meta: data.meta
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      products: [],
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } }
    }
  }
}


export function getImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  return `${API_BASE_URL}${imageUrl}`
}


export function isVariantInStock(variant: any): boolean {
  return variant.sizes.some((sizeItem: any) => sizeItem.stock_quantity > 0)
}


export function getVariantTotalStock(variant: any): number {
  return variant.sizes.reduce((total: number, sizeItem: any) => 
    total + sizeItem.stock_quantity, 0
  )
}