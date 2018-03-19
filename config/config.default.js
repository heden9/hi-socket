'use strict';

module.exports = appInfo => {
  const config = exports = {};
  config.io = require('./config.io');
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521446654625_4151';

  // add your config here
  config.middleware = [];

  return config;
};
