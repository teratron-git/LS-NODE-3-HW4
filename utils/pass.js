const crypto = require('crypto');
const db = require('../models/db');

module.exports.setPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 512, 'sha512')
    .toString('hex');
  return { salt, hash };
};

module.exports.checkPassword = (password) => {
  const user = db.get('user').value();

  const newHash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 512, 'sha512')
    .toString('hex');

  return newHash === user.hash;
};
