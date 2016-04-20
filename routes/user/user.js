var express = require('express');
var router = express.Router();
var RestMsg = require('../../common/restmsg'); // 引用restmsg模块
var UserService = require('../../service/user/userservice'); // 引用UserService模块
var UserBO = require('../../service/user/model/userbo'); // 引用userbo模块

var _privateFun = router.prototype;

//BO 转 VO 继承BO的字段方法2，并且进行相关字段的扩展和删除
_privateFun.prsBO2VO2 = function(obj){
    var result = obj.toObject({ transform: function(doc, ret, options){
        var status = ret.status==undefined?1:ret.status;
        return {
            id:ret._id,
            name: ret.name,
            creatdate: ret.creatDate? ret.creatDate.getTime():null,
            desc: ret.desc? ret.desc:null
            //,status:status// 状态值不显示
        }
    } });
    return result;
}



router.route('/')
 .get(function (req, res, next) { // 获取用户信息
        var query = {}; // 查询条件
        var name = req.param('name'); // 获取前台传过来的name参数
        if(name){
            query.name = new RegExp(name,'i'); // 不区分大小写模糊查询条件
        }
        var start = req.param('start');
        if(start){
            query.start = Number(start);
        }
        var row = req.param('row');
        if(row){
            query.row = Number(row);
        }
        var minCTime = req.param('minctime');
        var maxCTime = req.param('maxctime');
        if(minCTime&&minCTime){
           // mongodb的查询操作
            query.creatDate = {'$lte':new Date(maxCTime+' 23:59:59'),'$gte':new Date(minCTime+' 00:00:00')};
        }

        var restmsg = new RestMsg(); // 初始化restmsg，用于api返回信息
        UserService.findList(query,function(err,page){ // 调用service层的findList方法
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
        })
})
 .post(function (req, res, next) { // 增加用户信息
        var user = new UserBO();
        var restmsg = new RestMsg();
        var name = req.param('name');
        if(!name){
            restmsg.errorMsg('用户名称 必填');
            res.send(restmsg);
            return;
        }
        user.name = name;
        user.desc = req.param('desc',null);
        user.status = 1; // 初始化正常状态
        UserService.save(user,function(err,obj){
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
                return;
            }
            restmsg.successMsg();
            restmsg.setResult({pid:obj._id});
            res.send(restmsg);
        });
});

router.route('/:uid')
    .put(function (req, res, next) { // 修改用户信息
        var uid = req.params.uid;
        var user = new UserBO();
        user._id = uid;
        var name = req.param('name');
        if(!name){
            restmsg.errorMsg('用户名称 必填');
            res.send(restmsg);
            return;
        }
        user.name = name;
        user.desc = req.param('desc',null);
        user.status = 1; // 初始化正常状态
        var restmsg = new RestMsg();
        UserService.update(user,function(err,obj){
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
                return;
            }
            res.send( restmsg.successMsg());
        });
    })
   .delete(function(req,res,next){ // 删除用户信息
        var uid = req.params.uid;
        var restmsg = new RestMsg();
        UserService.remove(uid,function(err,obj){
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
                return;
            }
            res.send( restmsg.successMsg());
        });
    });

module.exports = router;
