'use strict';

const users = [];
/**
 * 建立了新的socket连接后，记录相应socketId
 */
function addSocketId(info) {
  const {
    tokenId, userId, socketId,
  } = info;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.tokenId === tokenId) {
      if (user.socketIds.indexOf(socketId) === -1) {
        user.socketIds.push(socketId);
      }
      return;
    }
  }
  users.push({
    userId,
    tokenId,
    socketIds: [ socketId ],
  });
  console.log(users);
}

/**
 * 通过给定的tokenId获取socketId
 */
function getSocketId(tokenId) {
  // 同一用户会打开多个页面，存在多个socketId
  let result = [];
  users.forEach(user => {
    if (user.tokenId === tokenId) {
      result = user.socketIds;
    }
  });
  return result;
}

/**
 * 通过给定的userId获取socketId
 */
function getSocketIdByUserId(userId) {
  // 同一用户会打开多个页面，存在多个socketId
  let result = [];
  users.forEach(user => {
    if (+user.userId === userId) {
      result = user.socketIds;
    }
  });
  return result;
}
/**
 * 关闭页面后，删除对应的socketId
 */
function deleteSocketId(socketId) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const sidIdx = user.socketIds.indexOf(socketId);

    if (sidIdx > -1) {
      user.socketIds.splice(sidIdx, 1);

      if (user.socketIds.length === 0) {
        users.splice(i, 1);
        break;
      }
    }
  }
  console.log(users);
}

module.exports = {
  getSocketId,
  addSocketId,
  getSocketIdByUserId,
  deleteSocketId,
};
