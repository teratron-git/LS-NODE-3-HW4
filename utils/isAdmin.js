module.exports = async (ctx, next) => {
  if (ctx.session.isAuthorized) {
    await next();
  } else {
    ctx.redirect('/login');
  }
};
