'use strict';
const { getSocketIdByUserId } = require('../../util');
module.exports = app => {
  class Controller extends app.Controller {
    async enter() {
      const message = this.ctx.args[0];
      console.log('chat :', message, process.pid);
    }
    async chat_send_msg() {
      const { sentId, receivedId, messages } = this.ctx.args[0];
      const socketIdSent = getSocketIdByUserId(sentId);
      const socketIdRece = getSocketIdByUserId(receivedId);
      const time = new Date().getTime();
      await this.ctx.socket.nsp.to(socketIdRece[0]).emit('chat_received_msg', { type: 'received', messages, time, sentId });
      await this.ctx.socket.nsp.to(socketIdSent[0]).emit('chat_received_msg', { type: 'sent', messages, time });
    }
  }
  return Controller;
};
