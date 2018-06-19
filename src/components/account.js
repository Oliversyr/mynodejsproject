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
    },
    updateAccount: (data) => {
        let accountTypeId = Math.floor(data.accountId / 1000) * 1000;
        return new Promise((resolve, reject) => {
            t_account.find({accountTypeId: accountTypeId}).then((res) => {
                let newData = res;
                newData.accountBalance = parseFloat(newData.accountBalance) + parseFloat(data.money);
                newData.accountList.forEach((item, i) => {
                    if(item.accountId === data.accountId) {
                        item.accountBalance = (parseFloat(item.accountBalance) + parseFloat(data.money)).toFixed(2);
                    }
                })
                t_account.update({accountTypeId: accountTypeId}, {$set: newData}).then((newRes) => {
                    resolve(newRes);
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            })
        }) 
    }
}

module.exports = account;
