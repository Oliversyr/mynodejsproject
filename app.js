const Koa = require('koa');
const app = new Koa();

let router = require('./src/router');

app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx) => {
//     ctx.body = "hello world!";
// })
// console.log(router);

app.listen(8085);

// console.log('服务器启动成功！')