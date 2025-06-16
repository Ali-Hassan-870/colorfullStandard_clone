// types/global.ts
export interface NavItem {
  id: number;
  name: string;
}

export interface NavSection {
  id: number;
  title: string;
  items: NavItem[];
}

export interface NavbarItem {
  id: number;
  name: string;
  sections: NavSection[];
}

export interface Banner {
  id: number;
  content: string;
}

export interface Navbar {
  id: number;
  items: NavbarItem[];
}

// Footer Types
export interface FooterLink {
  id: number;
  label: string;
  url: string;
  is_external: boolean;
}

export interface FooterSection {
  id: number;
  title: string;
  links: FooterLink[];
}

export interface PaymentCard {
  id: number;
  name: string;
  logo: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface Newsletter {
  id: number;
  title: string;
  description: string;
  placeholder: string;
}

export interface Footer {
  id: number;
  sections: FooterSection[];
  payment_cards: PaymentCard[];
  newsletter: Newsletter;
}

export interface GlobalData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  banner: Banner;
  navbar: Navbar;
  footer: Footer;
}

export interface ApiResponse {
  data: GlobalData;
  meta: Record<string, unknown>;
}

// Product Types (existing)
export interface ProductVariant {
  id: number;
  documentId: string;
  slug: string;
  price_override: number | null;
  color: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    color_code: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  images: {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
  }[];
  sizes: {
    id: number;
    stock_quantity: number;
    size: {
      id: number;
      documentId: string;
      name: string;
      display_order: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  gender: 'men' | 'women' | 'unisex';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  base_price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product_variants: ProductVariant[];
  reviews: any[];
  category: Category;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CollectionPageParams {
  params: {
    slug: string;
  };
}