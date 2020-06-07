const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const User = require('../models/usersModel');
const pass = require('./pass');

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

rl.on('close', async () => {
  const newUser = new User({ email, hash, salt });

  await newUser.save();
});
