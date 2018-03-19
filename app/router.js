'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  function mapRouter(controller) {
    Object.keys(controller).forEach(item => {
      io.route(item, controller[item]);
    });
  }
  router.get('/', controller.home.index);
  mapRouter(app.io.controller.msg);
};
