'use strict';

const Controller = require('egg').Controller;
const { sendMail } = require('../utils/mail');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async user() {
    const ctx = this.ctx;

    const user = await ctx.model.User.findOne({
      where: {
        id: ctx.body.user_id,
      },
    });

    ctx.body = user;
    ctx.status = 200;

  }

  async sendMail() {

    const ctx = this.ctx;
    const { email } = ctx.request.body;
    const key = require('uuid').v4();

    await ctx.model.Email.create({ key, email, verify: 0 });

    let template = require('fs').readFileSync(this.app.baseDir + '/app/template/email.html').toString('utf8');

    template = template.replace(/#email#/g, email);
    template = template.replace(/#key#/g, key);
    template = template.replace(/#date#/g, require('moment')().format('YYYY-MM-DD'));

    await sendMail({
      to: email,
      title: 'QuickAPI邮箱验证',
      html: template,
    });

    this.ctx.status = 200;
  }

  async register() {
    const ctx = this.ctx;
    const { username, email, password, key } = ctx.request.body;

    const emailModel = await ctx.model.Email.findOne({ where: { email, key } });

    if (!emailModel) {
      ctx.status = 400;
      ctx.body = { message: '邮箱与key不匹配！' };
      return;
    }

    if (emailModel.verify) {
      ctx.status = 400;
      ctx.body = { message: '该邮箱已经被注册！' };
      return;
    }

    const user = await ctx.model.User.create({ username, email, password });

    await emailModel.update({
      verify: 1,
    });

    ctx.status = 200;
    ctx.body = user;
  }

  async login() {
    const ctx = this.ctx;
    const { email, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({ where: { email, password }, attributes: ['id'] });
    if (!user) {
      ctx.status = 401;
      return;
    }
    let token = await ctx.model.Token.findOne({
      where: {
        user_id: user.id,
      },
    });

    const uuid = require('uuid').v1();
    let dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 1);
    dateTime = new Date(dateTime);

    if (token) {
      token = await token.update({
        token: uuid,
        expires: dateTime,
      });
      ctx.status = 200;
      ctx.body = token;
    } else {
      token = await ctx.model.Token.create({
        token: uuid,
        user_id: user.id,
        expires: dateTime,
        client_id: 'quick-api',
      });
      ctx.status = 200;
      ctx.body = token;
    }
  }
}

module.exports = HomeController;
