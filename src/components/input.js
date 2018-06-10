let appUtils = require('../common/appUtils');

const db = require('monk')(appUtils.mongodbUrl + '/yang');
const t_input = db.get('t_input');

let input = {
    getInCateList: (ctx) => {
        return new Promise((resolve, reject) => {
            let serObj = {};
            if(ctx.request.body.cateNum == 1) {
                serObj = {inputTypeId: 1000};
            } else if(ctx.request.body.cateNum && ctx.request.body.cateNum != 0) {
                serObj = {inputTypeId: ctx.request.body.cateNum};
            }
            t_input.find(serObj).then((res) => {
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

module.exports = input;
