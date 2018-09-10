'use strict';

const {
  addSocketId, deleteSocketId,
} = require('../../util');
module.exports = () => {
  return async (ctx, next) => {
    const socketId = ctx.socket.id;
    const tokenId = ctx.handshake.query.token;
    const userId = ctx.handshake.query.userId;
    addSocketId({
      tokenId, userId, socketId,
    });
    ctx.socket.emit('res', 'connected!');
    await next();
    deleteSocketId(socketId);
    // execute when disconnect.
    console.log('disconnection!');
  };
};
