'use strict';

/**
 * main-logo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::main-logo.main-logo');
