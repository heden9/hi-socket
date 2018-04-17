'use strict';
module.exports = app => {
  return async (ctx, next) => {
    const userId = ctx.userId = ctx.handshake.query.userId;
    await app.redis.sadd('userId', userId);
    console.log('#user_info', process.pid, userId);
    await next();
    // execute when disconnect.
    await app.redis.srem('userId', userId);
    console.log('disconnection!');
  };
};
