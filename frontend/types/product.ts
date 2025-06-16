export interface Size {
    id: number
    documentId: string
    name: string
    display_order: number
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  
  export interface Color {
    id: number
    documentId: string
    name: string
    slug: string
    color_code: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  
  export interface ProductImage {
    id: number
    documentId: string
    url: string
  }
  
  export interface ProductSizeStock {
    id: number
    stock_quantity: number
    size: Size
  }
  
  export interface ProductVariant {
    id: number
    documentId: string
    slug: string
    price_override: number | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    color: Color
    images: ProductImage[]
    sizes: ProductSizeStock[]
  }
  
  export interface Category {
    id: number
    documentId: string
    name: string
    slug: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    gender: string
  }
  
  export interface Product {
    id: number
    documentId: string
    name: string
    slug: string
    base_price: number
    product_info?: string
    care_instruction?: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    product_variants: ProductVariant[]
    reviews: any[] // You can define a proper Review type if needed
    category: Category
  }
  
  export interface ProductApiResponse {
    data: Product[]
    meta: {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
    }
  }
  
  export interface CartItem {
    productId: number
    variantId: number
    colorId: number
    sizeId: number
    quantity: number
    price: number
  }
  
  export interface ParsedSlug {
    gender: string
    productSlug: string
  }
