'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Token = app.model.define('oauth-token', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    token: STRING(50),
    expires: DATE,
    user_id: INTEGER,
    client_id: STRING(50),
  });

  Token.associate = () => {
    app.model.Token.belongsTo(app.model.User);
  };

  // Token.hasOne(app.model.User);

  return Token;
};
