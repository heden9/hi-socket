'use strict';
module.exports = {
  init: { }, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: [ 'auth' ],
      packetMiddleware: [ 'packet' ],
    },
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};
