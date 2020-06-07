const path = require('path');
const fs = require('fs');

const pathDb = path.join(__dirname, '..', 'db', 'skills.json');

class Skill {
  constructor({ age, concerts, cities, years }) {
    this.age = age;
    this.concerts = concerts;
    this.cities = cities;
    this.years = years;
  }

  async save() {
    const content = await Skill.readDb();

    content.forEach((item) => {
      if (item.key === 'age' && item.number !== this.age) {
        item.number = this.age;
      }

      if (item.key === 'concerts' && item.number !== this.concerts) {
        item.number = this.concerts;
      }

      if (item.key === 'cities' && item.number !== this.cities) {
        item.number = this.cities;
      }

      if (item.key === 'years' && item.number !== this.years) {
        item.number = this.years;
      }
    });

    await Skill.writeDb(content);
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

module.exports = Skill;
