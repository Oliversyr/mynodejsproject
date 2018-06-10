let appUtils = require('../common/appUtils');

const db = require('monk')(appUtils.mongodbUrl + '/yang');
const t_account = db.get('t_account');

let account = {
    getAccountList: (ctx) => {
        return new Promise((resolve, reject) => {
            t_account.find({}).then((res) => {
                let res_obj = {
                    retCode: "SUCCESS",
                    retMsg: "获取成功",
                    result: res
                }
                resolve(res_obj);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

module.exports = account;
