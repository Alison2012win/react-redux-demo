/**
 * 数据库连接
 * @type {exports}
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/buditam'); // 简写
//mongoose.connect('mongodb://user:pass@localhost:port/database')

module.exports = mongoose;
