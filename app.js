const Koa = require('koa');
const staticKoa = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const router = require('./routes');
const app = new Koa();

app.keys = ['MySuperSecretKey'];

const pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app,
});

app.use(staticKoa('./public'));

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      const err = {
        status: ctx.response.status,
        error: ctx.response.message,
      };
      ctx.app.emit('error', err, ctx);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    console.log(err);
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  ctx.response.body = {};
  ctx.render('pages/error', {
    status: ctx.response.status,
    error: ctx.response.message,
  });
});

app
  .use(
    session(
      {
        key: 'SESSID',
        maxAge: 86400000,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
        secure: false,
        sameSite: null,
      },
      app
    )
  )
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(process.env.PORT || 3000, function () {
  console.log(`Сервер запущен на порту ${server.address().port}...`);
});
