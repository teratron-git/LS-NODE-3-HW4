const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const db = require('../models/db');
const pass = require('./password');

let email = '';
let hash = '';
let salt = '';
let password = {};

rl.question('Email: ', (answer) => {
  email = answer;
  rl.question('Пароль: ', (answer) => {
    password = pass.setPassword(answer);
    hash = password.hash;
    salt = password.salt;
    rl.close();
  });
});

rl.on('close', () => {
  db.set('user', { email, hash, salt }).write();
});
