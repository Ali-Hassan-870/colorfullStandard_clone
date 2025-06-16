/**
 * `product-populate` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  const populate = {
    product_variants: {
      populate: {
        color: true,
        images: {
          fields: ["url"],
        },
        sizes: {
          populate: {
            size: true,
          },
        },
      },
    },
    reviews: true,
    category: true,
  };

  return async (ctx, next) => {
    strapi.log.info("In product-populate middleware.");
    ctx.query.populate = populate;

    await next();
  };
};
