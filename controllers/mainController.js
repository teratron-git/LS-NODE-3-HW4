const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const Product = require('../models/productsModel');
const Skill = require('../models/skillsModel');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: '>>>API ключ должен быть тут<<<',
    },
  })
);

module.exports.get = async (req, res) => {
  const products = await Product.readDb();
  const skills = await Skill.readDb();
  res.render('index', {
    title: 'Личная страница Архипова',
    products,
    skills,
    msg: req.query.msg,
  });
};

module.exports.post = async (req, res) => {
  try {
    await transporter.sendMail({
      to: 'temp@mail.ru',
      from: req.body.email,
      subject: `Message from ${req.body.name}, email: ${req.body.email}`,
      html: `Message: ${req.body.message}`,
    });
    res.redirect('/?msg=Ваше сообщение успешно отправлено');
  } catch (err) {
    console.log(err);
    res.redirect('/?msg=Возникли ошибки при отправлении сообщения');
  }
};
