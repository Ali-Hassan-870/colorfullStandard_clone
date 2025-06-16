// types/landing-page.ts
export interface Image {
    id: number;
    documentId: string;
    url: string;
  }
  
  export interface Button {
    id: number;
    label: string;
    url: string;
    is_external: boolean;
  }
  
  export interface ImageSection {
    id: number;
    headline: string;
    title: string;
    autoplay_delay: number;
    is_slides_show: boolean;
    images: Image[];
    buttons: Button[];
  }
  
  export interface ImagesGridBlock {
    __component: "landing-page.images-grid";
    id: number;
    left: ImageSection;
    right: ImageSection[];
  }
  
  export interface ImageItemBlock {
    __component: "landing-page.image-item";
    id: number;
    headline: string;
    title: string;
    autoplay_delay: number;
    is_slides_show: boolean;
    images: Image[] | null;
    buttons: Button[];
  }
  
  export type LandingPageBlock = ImagesGridBlock | ImageItemBlock;
  
  export interface LandingPageData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: LandingPageBlock[];
  }
  
  export interface LandingPageResponse {
    data: LandingPageData;
    meta: Record<string, any>;
  }