const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const uploadCheck = require('../utils/productUploadCheck');
const Product = require('../models/productsModel');
const Skill = require('../models/skillsModel');

module.exports.get = function (req, res) {
  res.render('admin', { title: 'Панель администратора', msg: req.query.msg });
};

module.exports.upload = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const upload = path.join('./public', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }

    const uploadItem = uploadCheck(fields, files);

    if (uploadItem.err) {
      fs.unlinkSync(files.photo.path);
      return res.redirect(`/?msg=${uploadItem.status}`);
    }

    const fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, async (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      const dir = fileName.substr(fileName.indexOf('\\'));
      const productData = {
        name: fields.name,
        price: fields.price,
        src: dir,
      };
      const product = new Product(productData);
      await product.save();
      res.redirect('/admin?msg=Новый товар успешно загружен');
    });
  });
};

module.exports.skills = async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.redirect('/admin?msg=Данные успешно изменены');
};
