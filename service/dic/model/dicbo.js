/**
 * 用户BO
 * @type {mongoose|exports|module.exports}
 */
var mongoose = require('../../../db/db');

// 定义字典集合的结构
var dicSchema = mongoose.Schema({
    'did': Number,  //字典ID
    "type": String, // 字典类型
    "code": Number, // 字典码
    "value": String // 字典值
},{versionKey:false});

var dic = mongoose.model('dic',dicSchema,'dics'); // 将定义好的结构封装成model

module.exports = dic; // 导出dicbo模块