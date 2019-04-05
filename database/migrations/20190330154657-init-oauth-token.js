'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable('oauth-tokens', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      token: STRING(50),
      expires: DATE,
      user_id: INTEGER,
      client_id: STRING(50),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('oauth-tokens');
  },

};
