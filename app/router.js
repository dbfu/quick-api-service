'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.home.login);
  router.get('/user', controller.home.user);
  router.post('/sendMail', controller.home.sendMail);
  router.post('/register', controller.home.register);
  router.resources('users', '/users', controller.users);
};
