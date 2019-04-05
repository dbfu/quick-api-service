'use strict';

const moment = require('moment');

module.exports = () => {
  return async function oauth(ctx, next) {

    const excludes = ['/login', '/sendMail', '/user', '/register'];

    if (excludes.includes(ctx.url)) {
      await next();
      return;
    }

    let authorization = ctx.headers.authorization;
    if (!authorization) {
      ctx.status = 401;
      return;
    }

    authorization = authorization.replace('Bearer ', '');
    const token = await ctx.model.Token.findOne({
      where: {
        token: authorization,
      },
    });

    if (!token) {
      ctx.status = 401;
      return;
    }
    if (moment().isAfter(moment(token.expires))) {
      ctx.status = 401;
      return;
    }

    ctx.body = { user_id: token.user_id };
    await next();
  };
};
