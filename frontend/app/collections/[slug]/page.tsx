import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CollectionPageParams, Product } from '@/types/global';
import { fetchProductsByCategory } from '@/lib/api';
import ProductCard from '@/components/common/product-card';
import Link from 'next/link';

// Generate metadata for SEO
export async function generateMetadata({ params }: CollectionPageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  if (!slug) {
    return { title: 'Collection Not Found' };
  }

  const parts = slug.split('-');
  const gender = parts[0];
  const categorySlug = parts.slice(1).join('-');
  
  const formattedCategory = categorySlug.replace('-', ' ');
  const title = `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s ${formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)}`;
  
  return {
    title: `${title} | Your Store`,
    description: `Shop our collection of ${title.toLowerCase()}. Premium quality, sustainable fashion.`,
  };
}

interface CollectionPageProps extends CollectionPageParams {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    size?: string;
    color?: string;
  }>;
}

const CollectionPage: React.FC<CollectionPageProps> = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const slug = resolvedParams.slug;
  
  if (!slug) {
    notFound();
  }

  // Parse slug
  const parts = slug.split('-');
  const gender = parts[0];
  const categorySlug = parts.slice(1).join('-');

  // Validate params
  if (!gender || !categorySlug || !['men', 'women', 'unisex'].includes(gender)) {
    notFound();
  }

  const currentPage = parseInt(resolvedSearchParams.page || '1');
  
  try {
    const productsData = await fetchProductsByCategory(categorySlug, gender, currentPage, 24);
    
    // Check if no products found
    if (!productsData.data || productsData.data.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No products found in this category
            </h2>
            <p className="text-gray-600 mb-6">
              Try exploring other categories or check back later.
            </p>
            {/* <BackButton /> */}
          </div>
        </div>
      );
    }

    // Format display names
    const categoryName = categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const genderFormatted = gender.charAt(0).toUpperCase() + gender.slice(1);
    const pageTitle = `${genderFormatted}'s ${categoryName}`;
    
    return (
      <div className="min-h-screen bg-white px-8 sm:px-10 lg:px-12 pb-16">
        {/* Header */}
        <div className="max-w-full mx-auto py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
            {pageTitle}
          </h1>
          {productsData.data[0]?.category?.description && (
            <p className="text-md text-black max-w-full mx-auto text-center">
              {productsData.data[0].category.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData.data.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {productsData.meta.pagination.pageCount > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                {Array.from({ length: productsData.meta.pagination.pageCount }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`?page=${page}`}
                    className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-md transition-colors ${
                      page === currentPage
                        ? 'bg-black text-white'
                        : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading collection:', error);
    
    // Simple error state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load the products. Please try again later.
          </p>
          <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  }
};

export default CollectionPage;