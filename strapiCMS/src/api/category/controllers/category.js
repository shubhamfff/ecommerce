'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category', ({strapi})=>({
    async findOne(ctx) {
      const {id} = ctx.params;

      const entity = await strapi.db.query('api::category.category').findOne({
        where: {slug: id},
        populate:['categoryPhoto']
      });

      const sanitizedResults = await this.sanitizeOutput(entity, ctx);     
      return this.transformResponse(sanitizedResults);
    }
}));
