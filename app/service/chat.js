'use strict';

const Service = require('egg').Service;

class ChatService extends Service {
  async saveRecord(sentId, receivedId, data) {
    const { redis } = this.app;
    const msg = JSON.stringify(data);
    const saveKey = this.ctx.helper.getSaveKey(sentId, receivedId);
    const isOnline = await redis.sismember('userId', receivedId) === 1;
    if (isOnline) {
      redis.rpush(saveKey, msg);
    } else {
      redis.rpush(`${receivedId}_unread`, msg);
    }
    console.log(saveKey, msg);
  }
  async loadRecord(sentId, receivedId) {
    const { redis } = this.app;
    const saveKey = this.ctx.helper.getSaveKey(sentId, receivedId);
    const data = await redis.lrange(saveKey, 0, -1) || [];
    const messageQ = data.map(item => JSON.parse(item));
    const unreadMsgQ = await redis.lrange(`${sentId}_unread`, 0, -1) || [];
    return { messageQ, unreadMsgQ };
  }
}

module.exports = ChatService;
