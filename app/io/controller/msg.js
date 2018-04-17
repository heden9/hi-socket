'use strict';
module.exports = app => {
  class Controller extends app.Controller {
    async chat_send_msg() {
      const { sentId, receivedId, messages } = this.ctx.args[0];
      const nsp = app.io.of('/');
      const socket = this.ctx.socket;
      const time = new Date().getTime();
      const data = { messages, time, sentId, receivedId };
      this.ctx.service.chat.saveRecord(sentId, receivedId, data);
      nsp.emit(receivedId, { role: 'callee', data });
      socket.emit(sentId, { role: 'caller', data });
    }
    async load_msg() {
      const { sentId, receivedId } = this.ctx.args[0];
      const socket = this.ctx.socket;
      const msgRecord = await this.ctx.service.chat.loadRecord(sentId, receivedId);
      socket.emit('load_msg', msgRecord);
    }
  }
  return Controller;
};
