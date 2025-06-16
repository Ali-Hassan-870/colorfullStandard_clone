import { ParsedSlug } from '@/types/product'

/**
 * Parse a product slug to extract gender and product slug
 * @param slug - The full slug (e.g., "men-classic-organic-tee")
 * @returns Object containing gender and productSlug
 */
export function parseProductSlug(slug: string): ParsedSlug {
  const parts = slug.split('-')
  
  if (parts.length < 2) {
    throw new Error('Invalid slug format. Expected format: "gender-product-slug"')
  }
  
  const gender = parts[0]
  const productSlug = parts.slice(1).join('-')
  
  // Validate gender
  const validGenders = ['men', 'women', 'kids', 'unisex']
  if (!validGenders.includes(gender.toLowerCase())) {
    throw new Error(`Invalid gender: ${gender}. Must be one of: ${validGenders.join(', ')}`)
  }
  
  return { 
    gender: gender.toLowerCase(), 
    productSlug 
  }
}

/**
 * Create a product slug from gender and product slug
 * @param gender - The gender category
 * @param productSlug - The product slug
 * @returns Combined slug
 */
export function createProductSlug(gender: string, productSlug: string): string {
  return `${gender.toLowerCase()}-${productSlug}`
}

/**
 * Slugify a string to create URL-friendly slugs
 * @param text - The text to slugify
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}