const sgMail = require('@sendgrid/mail');
const db = require('../models/db');

sgMail.setApiKey('>>> API ключ должен быть тут <<<');

module.exports.get = async (ctx, next) => {
  const products = db.get('products').value() || [];
  const skills = db.get('skills').value() || [];

  await ctx.render('pages/index', {
    title: 'Личная страница Архипова',
    products,
    skills,
    msg: ctx.request.query.msg,
  });
};

module.exports.post = async (ctx, next) => {
  const msg = {
    to: 'temp@mail.ru',
    from: ctx.request.body.email,
    subject: 'New message from your website',
    text: `New message from ${ctx.request.body.name}. Email: ${ctx.request.body.email}. Message: ${ctx.request.body.message}`,
    html: `<h3>New message from ${ctx.request.body.name}.</h3><p>Email: ${ctx.request.body.email}.</p><p>Message: ${ctx.request.body.message}</p>`,
  };

  try {
    await sgMail.send(msg);
    await ctx.redirect('/?msg=Письмо отправлено успешно#contact');
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    await ctx.redirect(
      '/?msg=Возникли ошибки при отправлении сообщения#contact'
    );
  }
};
