'use strict';

const nodemailer = require('nodemailer');

async function sendMail({ to, title, text, html }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    auth: {
      user: '876809592@qq.com', // generated ethereal user
      pass: 'skhozfkicykebegc', // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '876809592@qq.com', // sender address
    to, // list of receivers
    subject: title, // Subject line
    text, // plain text body
    html, // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(mailOptions);

  return info;
}

module.exports = { sendMail };
