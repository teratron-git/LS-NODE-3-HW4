const crypto = require('crypto');

module.exports.setPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 512, 'sha512')
    .toString('hex');
  return { salt, hash };
};

module.exports.checkPassword = (password, hash, salt) => {
  const newHash = crypto
    .pbkdf2Sync(password, salt, 1000, 512, 'sha512')
    .toString('hex');

  return newHash === hash;
};
