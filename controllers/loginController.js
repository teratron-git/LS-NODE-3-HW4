const User = require('../models/usersModel');

module.exports.get = function (req, res) {
  if (req.session.isAdmin) {
    res.redirect('/admin');
  } else {
    res.render('login', {
      title: 'Авторизация',
      msg: req.query.msg,
    });
  }
};

module.exports.post = (req, res) => {
  const user = User.findUser(req.body);

  if (user.length !== 0) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    res.redirect('/login?msg=Пользователь с такими данными не найден!');
  }
};
