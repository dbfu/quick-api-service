/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553959956688_4694';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
    'oauth',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

  };

  config.sequelize = {
    username: 'root',
    password: '123456',
    database: 'quick-api',
    host: '127.0.0.1',
    dialect: 'mysql',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
