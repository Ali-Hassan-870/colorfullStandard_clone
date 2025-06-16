/**
 * `global-populate` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  const populate = {
    banner: true,
    navbar: {
      populate: {
        items: {
          populate: {
            sections: {
              populate: {
                items: true,
              },
            },
          },
        },
      },
    },
    footer: {
      populate: {
        sections: {
          populate: {
            links: true,
          },
        },
        payment_cards: {
          populate: {
            logo: {
              fields: ["url"],
            },
          },
        },
        newsletter: true,
      },
    },
  };

  return async (ctx, next) => {
    strapi.log.info("In global-populate middleware.");
    ctx.query.populate = populate;
    await next();
  };
};
