const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const routes = require('./routes');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pages'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'MySecret',
    key: 'SESSID',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
  })
);

app.use(routes);

app.use((req, res, next) => {
  const err = new Error('Такая страница не найдена!');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message });
});

const server = app.listen(process.env.PORT || 3000, function () {
  console.log(`Сервер запущен на порту ${server.address().port}...`);
});
