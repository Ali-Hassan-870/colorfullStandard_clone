import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ProductPageClient } from '@/components/products/ProductDetailClient'
import { Product, ProductVariant } from '@/types/product'
import { fetchProduct, getImageUrl } from '@/lib/api/products'
import { parseProductSlug } from '@/utils/slug'

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { gender, productSlug } = parseProductSlug(params.slug)
  const product = await fetchProduct(productSlug, gender)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto p-14">
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div className="lg:col-span-5">
      <ProductPageClient product={product} />
    </div>
  </div>
</div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { gender, productSlug } = parseProductSlug(params.slug)
  const product = await fetchProduct(productSlug, gender)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} - ${product.category.name}`,
    description: product.category.description,
  }
}