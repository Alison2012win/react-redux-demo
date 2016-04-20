/**
 * 用户BO
 * Created by 李臣 on 2016/3/24.
 * @type {mongoose|exports}
 */
var mongoose = require('../../../db/db');

var userSchema = mongoose.Schema({
    "full_name": String, //"<用户名称>",
    "username": String, //"<用户登录名称>",
    "password": String, //"<用户登录密码>",
    "email": String, //"<用户邮箱>",
    "created_at": Date //<用户创建时间>
},{versionKey:false});

var user = mongoose.model('user', userSchema, 'user');

module.exports = user;