'use strict';

module.exports = () => {
  return async (ctx, next) => {
    console.log('packet:', this.packet);
    await next();
  };
};
