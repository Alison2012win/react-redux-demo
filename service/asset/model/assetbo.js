/**
 * Created by LL on 2016/3/24.
 */

/**
 * 项目BO
 * @type {mongoose|exports}
 */
var mongoose = require('../../../db/db');

// 定义用户集合的结构
var assetSchema = mongoose.Schema({
    "name": String, //服务器名称
    "ip": String, //服务器地址
    "parentNode": String, //所属节点服务器名称，如虚拟机所属物理机
    "memory": Number, //内存大小，单位G
    "slotNum": Number, //CPU插槽数
    "coreNum": Number, //各插槽核心数
    "hardDisk": String, //硬盘大小，含SSD
    "os": Number, //操作系统
    "type": Number, //服务器类型
    "appsInfo": String, //应用部署信息，当服务器类型为应用服务器时
    "admin": String, //设备负责人
    "username": String, //账户信息--用户名
    "password": String, //账户信息--密码，入库前加密
    "state": Number, //设备状态，不输入时默认0——停止
    "mac": String, //mac地址
    "accessToInternet": Boolean, //是否可访问外网，不输入时默认0——否
    "info": String //服务器描述信息
},{versionKey:false});

var asset = mongoose.model('asset', assetSchema,'assets'); // 将定义好的结构封装成model

module.exports = asset; // 导出assetbo模块
