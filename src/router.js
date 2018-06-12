const Router = require('koa-router');

let loginFn = require('./login');
let accountFn = require('./components/account');
let inputFn = require('./components/input');
let outputFn = require('./components/output');
let recordFn = require('./components/record');

let router = new Router();

let login = new Router();
let account = new Router();
let input = new Router();
let output = new Router();
let record = new Router();

login.get('/login', async (ctx) => {
    // console.log(ctx.request)
    ctx.body = await loginFn(ctx);
})

account.get('/getAccountList', async (ctx) => {
    ctx.body = await accountFn.getAccountList(ctx);
})

input.post('/getInCateList', async (ctx) => {
    ctx.body = await inputFn.getInCateList(ctx);
})

output.post('/getOutCateList', async (ctx) => {
    ctx.body = await outputFn.getOutCateList(ctx);
})

record.post('/saveRecord', async (ctx) => {
    ctx.body = await recordFn.saveRecord(ctx);
})

router.use('', login.routes(), login.allowedMethods());
router.use('/account', account.routes(), account.allowedMethods());
router.use('/input', input.routes(), input.allowedMethods());
router.use('/output', output.routes(), output.allowedMethods());
router.use('/record', record.routes(), record.allowedMethods());

module.exports = router;