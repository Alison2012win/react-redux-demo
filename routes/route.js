/**
 * API 请求路由
 * @type {exports}
 */
var express = require('express');
var router = express.Router();
var crypto = require('../common/encrypt');
var RestMsg = require('../common/restmsg');
var UserService = require('../service/user/userservice');
var UserBO = require('../service/user/model/userbo');

router.get('/', function(req, res) {
    res.render('./components/App.js',{status:0});
});

module.exports = router;