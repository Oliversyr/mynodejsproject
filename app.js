const Koa = require('koa');
const app = new Koa();
let cors = require('koa2-cors');
let router = require('./src/router');
let bodyParser = require('koa-bodyparser');

app.use(bodyParser());

app.use(cors({
    origin: function(ctx) {
    //   if (ctx.url === '/test') {
    //     return false;
    //   }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(router.routes()).use(router.allowedMethods());
// app.use(async (ctx) => {
//     ctx.body = "hello world!";
// })
// console.log(router);

app.listen(8085);
console.log("服务器已启动！")

