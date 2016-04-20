/**
 * API 请求路由
 * @type {exports}
 */
var express = require('express');
var router = express.Router();
var user = require('./user/user');
var asset = require('./asset/asset');
var dic = require('./dic/dic');

//允许跨域访问资源，
//router.use(function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    next();
//});

router.use('/users', user);
router.use('/assets', asset);
router.use('/dics', dic);

module.exports = router;