/**
 * `landing-page-populate` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  const populate = {
    blocks: {
      on: {
        "landing-page.images-grid": {
          populate: {
            left: {
              populate: {
                images: {
                  fields: ["url"],
                },
                buttons: true,
              },
            },
            right: {
              populate: {
                images: {
                  fields: ["url"],
                },
                buttons: true,
              },
            },
          },
        },
        "landing-page.image-item": {
          populate: {
            images: {
              fields: ["url"],
            },
            buttons: true,
          },
        },
      },
    },
  };

  return async (ctx, next) => {
    strapi.log.info("In landing-page-populate middleware.");
    ctx.query.populate = populate;
    await next();
  };
};
