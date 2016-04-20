var express = require('express');
var router = express.Router();
var encrypt = require('../../common/encrypt'); // 引用encrypt模块
var RestMsg = require('../../common/restmsg'); // 引用restmsg模块
var AssetService = require('../../service/asset/assetservice'); // 引用AssetService模块
var AssetBO = require('../../service/asset/model/assetbo'); // 引用assetbo模块

var _privateFun = router.prototype;

//BO 转 VO 继承BO的字段方法2，并且进行相关字段的扩展和删除
_privateFun.prsBO2VO2 = function(obj){
    var result = obj.toObject({ transform: function(doc, ret, options){
        return {
            aid:ret._id,
            name: ret.name,
            parentNode: ret.parentNode,
            type:ret.type,
            appsInfo:ret.appsInfo,
            state:ret.state,
            ip: ret.ip,
            coreNum: ret.coreNum,
            memory: ret.memory,
            slotNum: ret.slotNum,
            hardDisk: ret.hardDisk,
            os: ret.os,
            admin: ret.admin,
            username: ret.username,
            password: ret.password,
            mac: ret.mac,
            accessToInternet: ret.accessToInternet,
            info: ret.info
        }
    }  });
    return result;
}

router.route('/')
    .get(function (req, res, next) { // 获取资产信息
        var restmsg = new RestMsg();
        var query = {}; // 查询条件
        var name = req.param('name');
        var parentNode = req.param('parentName');
        var type = req.param('type');
        var appsInfo = req.param('appsInfo');
        var state = req.param('state');
        var ip = req.param('ip');
        var isAll = req.param('isAll');
        query.start = req.param('start');
        query.row = req.param('row');
        if(name) {
            query.name = new RegExp("^.*"+name+".*$",'i'); // 模糊查询
        }
        if(parentNode) {
            query.parentNode = parentNode;
        }
        if(type) {
            query.type = type;
        }
        if(appsInfo) {
            query.appsInfo = new RegExp("^.*"+appsInfo+".*$",'i'); // 模糊查询
        }
        if(state) {
            query.state = state;
        }
        if(ip) {
            query.ip = new RegExp("^.*"+ip+".*$",'i'); // 模糊查询
        }
        if(isAll) { // 全部查询
            delete query.row;
            delete query.start;
            AssetService.findList(query,function(err,list){
                if (err) { // 捕捉异常，api返回异常信息
                    restmsg.errorMsg(err);
                    res.setResult(null);
                    res.send(restmsg);
                    return;
                }
                if(list){
                    list = list.map(_privateFun.prsBO2VO2);
                }
                var data = {};
                data.data = list;
                restmsg.successMsg();
                restmsg.setResult(data);
                res.send(restmsg);
            })
        } else { // 分页查询
            AssetService.findPage(query,function(err,page){ // 调用service层的findList方法
                if (err) {
                    restmsg.errorMsg(err);
                    res.send(restmsg);
                    return;
                }
                if(page){ // 查询出page后封装返回
                    var objs = page.data;
                    if(objs!==null&&objs.length>0){
                        objs = objs.map(_privateFun.prsBO2VO2);
                        page.setData(objs);
                    }
                }
                restmsg.successMsg();
                restmsg.setResult(page);
                res.send(restmsg);
            });
        }
    })
    .post(function (req, res, next) { // 增加资产信息
        var asset = new AssetBO();
        var restmsg = new RestMsg();
        var name = req.param('name');
        var ip = req.param('ip');
        var slotNum = req.param('slotNum');
        var memory = req.param('memory');
        var coreNum = req.param('coreNum');
        var hardDisk = req.param('hardDisk');
        asset.state = req.param('state');
        asset.accessToInternet = req.param('accessToInternet');
        if(!name||!coreNum||!hardDisk||!slotNum||!memory||!ip){
            restmsg.errorMsg('有必填项未填！');
            restmsg.setResult(null);
            res.send(restmsg);
            return;
        }
        AssetService.find({'name':name},function(err,ret){
            if (err) {
                restmsg.errorMsg(err);
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            if(ret){
                restmsg.errorMsg(name+"已经存在！");
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            if(!asset.state){
                asset.state = 0;
            }
            if(!asset.accessToInternet){
                asset.accessToInternet = false;
            }
            if(req.param('password')){
                asset.password = encrypt.encode(req.param('password'));
            }
            asset.parentNode = req.param('parentNode');
            asset.type = req.param('type');
            asset.appsInfo = req.param('appsInfo');
            asset.info = req.param('info');
            asset.username = req.param('username');
            asset.os = req.param('os');
            asset.admin = req.param('admin');
            asset.mac = req.param('mac');
            asset.name = name;
            asset.slotNum =slotNum;
            asset.coreNum = coreNum;
            asset.ip = ip;
            asset.memory = memory;
            asset.hardDisk = hardDisk;
            AssetService.save(asset,function(err,obj){
                if (err) {
                    restmsg.errorMsg(err);
                    restmsg.setResult(null);
                    res.send(restmsg);
                    return;
                }
                restmsg.successMsg();
                restmsg.setResult(null);
                res.send(restmsg);
            });
        });
    });

router.route('/:aid')
    .get(function(req, res, next){ // 获取单个资产信息
        var aid = req.params.aid;
        var restmsg = new RestMsg(); // 初始化restmsg，用于api返回信息
        AssetService.find({'_id':aid},function(err,ret){
            if (err) {
                restmsg.errorMsg(err);
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            if(ret){
                ret.aid = ret._id;
                delete ret._id;
                if(ret.password){
                    ret.password = encrypt.dencode(ret.password);
                }
            }
            restmsg.successMsg();
            restmsg.setResult(ret);
            res.send(restmsg);
        });
    })
    .post(function (req, res, next) { // 修改资产信息
        var restmsg = new RestMsg();
        var asset = new AssetBO();
        var aid = req.params.aid;
        var name = req.param('name');
        AssetService.find({'name':name},function(err,ret) {
            if (err) {
                restmsg.errorMsg(err);
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            if(!req.param('isEditState')&&ret&&ret._id != aid){
                restmsg.errorMsg("已有该服务器名");
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            asset._id = aid;
            asset.name = name;
            asset.ip = req.param('ip');
            asset.slotNum = req.param('slotNum');
            asset.memory = req.param('memory');
            asset.coreNum = req.param('coreNum');
            asset.hardDisk = req.param('hardDisk');
            asset.parentNode = req.param('parentNode');
            asset.type = req.param('type');
            asset.appsInfo = req.param('appsInfo');
            asset.info = req.param('info');
            asset.username = req.param('username');
            asset.password = req.param('password');
            asset.os = req.param('os');
            asset.admin = req.param('admin');
            asset.mac = req.param('mac');
            asset.state = req.param('state');
            asset.accessToInternet = req.param('accessToInternet');
            if(asset.password){
                asset.password = encrypt.encode(asset.password);
            }
            AssetService.update(asset,function(err,obj){
                if (err) {
                    restmsg.errorMsg(err);
                    restmsg.setResult(null);
                    res.send(restmsg);
                    return;
                }
                restmsg.successMsg();
                restmsg.setResult(null);
                res.send( restmsg);
            });
        });
    })
    .delete(function(req,res,next){ // 删除用户信息
        var aid = req.params.aid;
        var restmsg = new RestMsg();
        AssetService.remove(aid,function(err,obj){
            if (err) {
                restmsg.errorMsg(err);
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            restmsg.successMsg();
            restmsg.setResult(null);
            res.send(restmsg);
        });
    });

module.exports = router;

