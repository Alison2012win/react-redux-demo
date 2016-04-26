var express = require('express');
var router = express.Router();
var RestMsg = require('../../common/restmsg'); // 引用restmsg模块
var DicService = require('../../service/dic/dicservice'); // 引用DicService模块
var DicBO = require('../../service/dic/model/dicbo'); // 引用dicbo模块

var _privateFun = router.prototype;

//BO 转 VO 继承BO的字段方法2，并且进行相关字段的扩展和删除
_privateFun.prsBO2VO2 = function(obj){
    var result = obj.toObject({ transform: function(doc, ret, options){
        return {
            did:ret._id,
            code: ret.code,
            value: ret.value,
            type:ret.type
        }
    } });
    return result;
}

router.route('/')
    .get(function (req, res, next) { // 获取字典信息
        var restmsg = new RestMsg(); // 初始化restmsg，用于api返回信息
        var query = {}; // 查询条件
        query.start = req.param('start'); // 获取前台传过来的start参数
        query.row = req.param('row'); // 获取前台传过来的row参数
        if(req.param('type')){
            query.type = req.param('type');
        }
        DicService.findPage(query,function(err,page){ // 调用service层的findPage方法
            if (err) { // 捕捉异常，api返回异常信息
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

            restmsg.successMsg(); // restmsg状态码设置为成功状态
            restmsg.setResult(page); // restmsg结果部分设置为封装好的page
            res.send(restmsg); // api返回restmsg
        });
    })
    .post(function (req, res, next) { // 增加字典信息
        var dic = new DicBO();
        var restmsg = new RestMsg();
        var type = req.param('type');
        var code = req.param('code');
        var value = req.param('value');
        if(!type||!code||!value){
            restmsg.errorMsg('还有必填项未填');
            restmsg.setResult(null);
            res.send(restmsg);
            return;
        }
        DicService.find({'type':type,'code':code},function(err,ret){
            if (err) {
                restmsg.errorMsg(err);
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            if(ret){
                restmsg.errorMsg("该类型及状态值已存在！");
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            dic.code = code;
            dic.value = value;
            dic.type = type;
            DicService.save(dic,function(err,obj){
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

router.route('/:did')
    .post(function (req, res, next) { // 修改字典信息
        var restmsg = new RestMsg();
        var did = req.params.did;
        var dic = new DicBO();
        dic._id = did;
        var type = req.param('type');
        var code = req.param('code');
        var value = req.param('value');
        if((!type&&type==null)||(!code&&code==null)||(!value&&value==null)){
            restmsg.errorMsg('必填项不可修改为空');
            restmsg.setResult(null);
            res.send(restmsg);
            return;
        }
        dic.code = code;
        dic.value = value;
        dic.type = type;
        DicService.update(dic,function(err,obj){
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

router.route('/total')
    .get(function(req, res, next){ // 获取所有字典信息
        var restmsg = new RestMsg(); // 初始化restmsg，用于api返回信息
        var query = {};
        if(req.param('type')){
            query.type = req.param('type');
        }
        DicService.findList(query,function(err,ret){
            if (err) {
                restmsg.errorMsg(err);
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            if(ret) {
                ret = ret.map(_privateFun.prsBO2VO2);
            }
            var data = {};
            data.data = ret;

            restmsg.successMsg(); // restmsg状态码设置为成功状态
            restmsg.setResult(data);
            res.send(restmsg);
            return;
        })
    });

router.route('/:did')
    .get(function(req, res, next){ // 获取单条字典信息
        var did = req.params.did;
        var restmsg = new RestMsg(); // 初始化restmsg，用于api返回信息
        DicService.find({'_id':did},function(err,ret){
            if (err) {
                restmsg.errorMsg(err);
                restmsg.setResult(null);
                res.send(restmsg);
                return;
            }
            if(ret){
                ret.did = ret._id;
                delete ret._id;
            }
            restmsg.successMsg(); // restmsg状态码设置为成功状态
            restmsg.setResult(ret);
            res.send(restmsg);
        });
    })
    .delete(function(req,res,next){ // 删除字典信息
        var did = req.params.did;
        var restmsg = new RestMsg();
        DicService.remove(did,function(err,obj){
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
