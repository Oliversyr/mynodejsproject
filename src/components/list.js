let appUtils = require('../common/appUtils');

const db = require('monk')(appUtils.mongodbUrl + '/yang');
let myDate = new Date();
let thisYear = myDate.getFullYear();
const t_bill = db.get('t_bill');
// const t_account = db.get('t_account');
let account = require('./account');

let list = {
    getList: (ctx) => {
        return new Promise((resolve, reject) => {
            let serObj = {};
            console.log('ctx.request.body==', ctx.request.body);
            let params = ctx.request.body;
            let month = params.month;
            let year = month.substr(0, 4);
            let nextMonth = (parseInt(month) + 1).tostring();
            if(month == 0) {
                t_bill.find({}).then((res) => {
                    let res_obj = {
                        retCode: "SUCCESS",
                        retMsg: "查询成功",
                        result: res
                    }
                    resolve(res_obj);
                }).catch((err) => {
                    reject(err);
                })
            } else {
                let t_bill_year = db.get('t_bill' + year);
                t_bill_year.find({recordTime: {$gte: month, $lte: nextMonth}}).then((res) => {
                    let res_obj = {
                        retCode: "SUCCESS",
                        retMsg: "查询成功",
                        result: res
                    }
                    resolve(res_obj);
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    }
}

module.exports = list;
