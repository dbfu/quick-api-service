'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      email: STRING(50),
      password: STRING(20),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },

};
