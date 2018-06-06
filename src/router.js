const Koa = require('koa');
// const app = new Koa();

let loginFn = require('./login');

const Router = require('koa-router');

let router = new Router();

let login = new Router();
login.get('/login', async (ctx) => {
    // console.log(ctx.request)
    ctx.body = await loginFn(ctx);
})

router.use('', login.routes(), login.allowedMethods());

module.exports = router;