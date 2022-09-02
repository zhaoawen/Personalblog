// 导入定义验证规则的包
const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const userpwd = joi.string().alphanum().min(1).max(10).required()
const userdel = joi.string().alphanum().min(1).max(11).required()


exports.reg_schema = {
    body:{
        userpwd,
        userdel,
    },
}