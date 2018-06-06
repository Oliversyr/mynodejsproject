const Koa = require('koa');


const db = require('monk')('localhost:27017/test');
let testdb = db.get('test');

let doLogin = (ctx) => {
    return new Promise((resolve, reject) => {
        let str = "登录成功！";

        testdb.find({}).then((res) => {
            console.log(res);
            resolve(res);
        }).catch((err) => {
            reject(err);
        })
        
    })
}

module.exports = doLogin;