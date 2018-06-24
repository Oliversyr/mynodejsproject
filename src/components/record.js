let appUtils = require('../common/appUtils');

const db = require('monk')(appUtils.mongodbUrl + '/yang');
let myDate = new Date();
let thisYear = myDate.getFullYear();
const t_bill = db.get('t_bill_' + thisYear);
// const t_account = db.get('t_account');
let account = require('./account');

let record = {
    saveRecord: (ctx) => {
        return new Promise((resolve, reject) => {
            let serObj = {};
            console.log('ctx.request.body==', ctx.request.body);
            let params = ctx.request.body;
            let insertDoc = {
                "money": params.money,
                "recordType": params.recordType,
                "recordCateId": params.recordCateId,
                "recordCateName": params.recordCateName,
                "accountId": params.accountId,
                "accountName": params.accountName,
                "recordTime": params.recordTime,
                "notes": params.notes,
            }

            insertDoc.billId = insertDoc.recordTime.split('T')[0].split('-').join('') + myDate.getTime();

            t_bill.insert(insertDoc).then((res) => {
                let res_obj = {
                    retCode: "SUCCESS",
                    retMsg: "保存成功",
                    result: res
                }

                account.updateAccount(insertDoc);
                resolve(res_obj);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

module.exports = record;
