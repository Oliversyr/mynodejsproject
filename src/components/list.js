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
            let nextMonth = (parseInt(month) + 1).toString();
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
                let t_bill_year = db.get('t_bill_' + year);
                t_bill_year.find({billId: {$gte: month, $lte: nextMonth}}, {sort: {billId: -1}}).then((res) => {
                    let dayArr = [];
                    res.forEach((item, i) => {
                        let isExist = false;
                        dayArr.forEach((dayItem, j) => {
                            if(item.billId.substr(0, 8) === dayItem.day) {
                                isExist = true;
                                
                                if(item.recordType === 'in') {
                                    dayItem.dayIn += parseInt(item.money);
                                } else if(item.recordType === 'out') {
                                    dayItem.dayOut += parseInt(item.money);
                                }

                                dayItem.detail.push(item);
                            }
                        })

                        if(!isExist) {
                            let dayObj = {
                                day: item.billId.substr(0, 8),
                                detail: [item],
                                dayIn: 0,
                                dayOut: 0
                            }

                            if(item.recordType === 'in') {
                                dayObj.dayIn += parseInt(item.money);
                            } else if(item.recordType === 'out') {
                                dayObj.dayOut += parseInt(item.money);
                            }

                            let thisYear = parseInt(item.billId.substr(0, 4));
                            let thisMonth = parseInt(item.billId.substr(4, 2)) - 1;
                            let thisDay = parseInt(item.billId.substr(6, 2));

                            let thisDate = new Date(thisYear, thisMonth, thisDay);

                            dayObj.week = thisDate.getDay();
                            dayObj.date = item.billId.substr(6, 2);

                            dayArr.push(dayObj);
                        }
                        
                    })

                    let res_obj = {
                        retCode: "SUCCESS",
                        retMsg: "查询成功",
                        result: dayArr
                    }
                    resolve(res_obj);
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    },
    updateMonth: (data) => {
        let month = data.billId.substr(0, 6);
        let obj = {};
        t_bill.find({month: month}).then((res) => {
            console.log("<><><><><><>",data, res.length);
            if(res.length > 0) {
                if(data.recordType === 'in') {
                    obj.monthIn = (parseFloat(res[0].monthIn) + parseFloat(data.money)).toFixed(2); 
                } else if(data.recordType === 'out') {
                    obj.monthOut = (parseFloat(res[0].monthOut) + parseFloat(data.money)).toFixed(2); 
                }
    
                t_bill.update({month: month}, {$set: obj});
            } else {
                if(data.recordType === 'in') {
                    obj['monthIn'] = data.money; 
                    obj['monthOut'] = '0.00';
                } else if(data.recordType === 'out') {
                    obj['monthOut'] = data.money; 
                    obj['monthIn'] = '0.00';
                }
                obj.month = month;
                t_bill.insert(obj);
            }
            
        })
        
    }
}

module.exports = list;
