'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Email = app.model.define('email', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: STRING(60),
    key: STRING(50),
    verify: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Email;
};
