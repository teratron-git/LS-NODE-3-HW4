const path = require('path');
const fs = require('fs');

const pass = require('../utils/pass');

const pathDb = path.join(__dirname, '..', 'db', 'users.json');

class User {
  constructor({ email, hash, salt }) {
    this.email = email;
    this.hash = hash;
    this.salt = salt;
  }

  static async save() {
    const users = await User.readDb();

    users.push({ email: this.email, hash: this.hash, salt: this.salt });

    await User.writeDb(users);
  }

  static async findUser({ email, password }) {
    const users = await User.readDb();

    return users.filter(
      (user) =>
        user.email === email &&
        pass.checkPassword(password, user.hash, user.salt)
    );
  }

  static async readDb() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathDb, 'utf-8', (err, content) =>
        err ? reject(err) : resolve(JSON.parse(content))
      );
    });
  }

  static async writeDb(content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(pathDb, JSON.stringify(content), (err) =>
        err ? reject(err) : resolve()
      );
    });
  }
}

module.exports = User;
