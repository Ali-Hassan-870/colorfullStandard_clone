import type { Schema, Struct } from '@strapi/strapi';

export interface LandingPageImageItem extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_image_items';
  info: {
    displayName: 'image-item';
  };
  attributes: {
    autoplay_delay: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    buttons: Schema.Attribute.Component<'shared.footer-link', true>;
    headline: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true>;
    is_slides_show: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface LandingPageImagesGrid extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_images_grids';
  info: {
    displayName: 'images-grid';
  };
  attributes: {
    left: Schema.Attribute.Component<'landing-page.image-item', false>;
    right: Schema.Attribute.Component<'landing-page.image-item', true>;
  };
}

export interface ProductSizeAvailability extends Struct.ComponentSchema {
  collectionName: 'components_product_size_availabilities';
  info: {
    displayName: 'size-availability';
  };
  attributes: {
    size: Schema.Attribute.Relation<'oneToOne', 'api::size.size'>;
    stock_quantity: Schema.Attribute.Integer;
  };
}

export interface SharedBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_banners';
  info: {
    displayName: 'banner';
  };
  attributes: {
    content: Schema.Attribute.Text;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    newsletter: Schema.Attribute.Component<'shared.newsletter-signup', false>;
    payment_cards: Schema.Attribute.Component<'shared.payment-card', true>;
    sections: Schema.Attribute.Component<'shared.footer-section', true>;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    displayName: 'footer-link';
  };
  attributes: {
    is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_sections';
  info: {
    displayName: 'footer-section';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.footer-link', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'nav-item';
  };
  attributes: {
    name: Schema.Attribute.Enumeration<
      ['Men', 'Women', 'Transparency', 'Stores', 'Colors']
    >;
    sections: Schema.Attribute.Component<'shared.nav-section', true>;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    displayName: 'nav-link';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface SharedNavSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_sections';
  info: {
    displayName: 'nav-section';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.nav-link', true>;
    title: Schema.Attribute.Enumeration<
      ['Clothing', 'Accessories', 'Activewear', 'Gift Cards']
    >;
  };
}

export interface SharedNavbar extends Struct.ComponentSchema {
  collectionName: 'components_shared_navbars';
  info: {
    displayName: 'navbar';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.nav-item', true>;
  };
}

export interface SharedNewsletterSignup extends Struct.ComponentSchema {
  collectionName: 'components_shared_newsletter_signups';
  info: {
    displayName: 'newsletter-signup';
  };
  attributes: {
    description: Schema.Attribute.Text;
    placeholder: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedPaymentCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_payment_cards';
  info: {
    displayName: 'payment-card';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'landing-page.image-item': LandingPageImageItem;
      'landing-page.images-grid': LandingPageImagesGrid;
      'product.size-availability': ProductSizeAvailability;
      'shared.banner': SharedBanner;
      'shared.footer': SharedFooter;
      'shared.footer-link': SharedFooterLink;
      'shared.footer-section': SharedFooterSection;
      'shared.nav-item': SharedNavItem;
      'shared.nav-link': SharedNavLink;
      'shared.nav-section': SharedNavSection;
      'shared.navbar': SharedNavbar;
      'shared.newsletter-signup': SharedNewsletterSignup;
      'shared.payment-card': SharedPaymentCard;
    }
  }
}
