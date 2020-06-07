const db = require('../models/db');
const pass = require('../utils/pass');

module.exports.get = async (ctx, next) => {
  if (ctx.session.isAuthorized) {
    ctx.redirect('/admin');
  } else {
    await ctx.render('pages/login', {
      title: 'Авторизация',
      msg: ctx.request.query.msg,
    });
  }
};

module.exports.post = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = db.get('user').value();

  if (user.email === email && pass.checkPassword(password)) {
    ctx.session.isAuthorized = true;
    await ctx.redirect('/admin');
  } else {
    await ctx.redirect('/login?msg=Пользователь с такими данными не найден!');
  }
};
