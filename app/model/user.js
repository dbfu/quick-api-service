'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    email: STRING(50),
    password: STRING(20),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
