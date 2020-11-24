const nodemailer = require('nodemailer');
const AppError = require('./appError');

exports.sendEmail = (email, title, html, next) => {

    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f9921f68e0a510',
        pass: '6399a7b1b2497b',
      },
    });

    return transport.sendMail({
      from: 'shop@gmail.com',
      to: email,
      subject: title,
      html,
    });

};
