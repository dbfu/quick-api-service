'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable('emails', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      email: STRING(60),
      key: STRING(50),
      verify: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('emails');
  },
};
