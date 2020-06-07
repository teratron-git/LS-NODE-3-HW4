const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;

const pathDb = path.join(__dirname, '..', 'db', 'products.json');

class Product {
  constructor({ price, name, src }) {
    this.price = price;
    this.name = name;
    this.src = src;
    this.id = uuid();
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

  async save() {
    const content = await Product.readDb();

    content.push({
      name: this.name,
      price: this.price,
      src: this.src,
    });

    await Product.writeDb(content);
  }
}

module.exports = Product;
