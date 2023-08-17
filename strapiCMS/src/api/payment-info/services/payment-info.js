'use strict';

/**
 * payment-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::payment-info.payment-info');
