'use strict';

module.exports = app => {
  return async (ctx, next) => {
    console.log('packet:', this.packet);
    await next();
  };
};
