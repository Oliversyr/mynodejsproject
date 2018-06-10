let appUtils = require('../common/appUtils');

const db = require('monk')(appUtils.mongodbUrl + '/yang');
const t_output = db.get('t_output');

let output = {
    getOutCateList: (ctx) => {
        return new Promise((resolve, reject) => {
            let serObj = {};
            console.log('ctx.request.body==', ctx.request.body)
            if(ctx.request.body.cateNum == 1) {
                serObj = {outputTypeId: 1000};
            } else if(ctx.request.body.cateNum && ctx.request.body.cateNum != 0) {
                serObj = {outputTypeId: ctx.request.body.cateNum};
            }
            t_output.find(serObj).then((res) => {
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

module.exports = output;
