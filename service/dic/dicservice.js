/**
 * 字典模块服务层
 * @type {dic|exports}
 */
var Dic = require('./model/dicbo'); // 导入dicbo模块
var Page = require('../../common/page'); // 导入page模块

function DicService(){  // 声明DicService函数

}

/**
 * 查找单条字典数据
 * @param {query|type和value查询条件}
 * @param callback
 */
DicService.find = function(query,callback){
    Dic.findOne(query,function(err,ret){
        if(err) {
            callback(err);
            return console.error(err);
        }
        callback(null,ret);
    });
}

/**
 * 保存字典
 * @param {bo|dicbo对象}
 * @param {callback|回调函数}
 */
DicService.save = function(bo,callback){
    bo.creatDate = new Date();
    bo.save(function (err, bo) { // mongoose中model对象的save方法
        if (err) {
            callback(err);
            return console.error(err);
        }
        callback(null, bo); // 保存成功后执行回调函数
    });
};

/**
 * 查询字典列表
 * @param {query|查询条件}
 * @param {callback|回调函数}
 */
DicService.findList = function(query,callback){
    if(!query){
        query = {};
    }
    Dic.find(query,function (err, bos) {
        if (err){
            callback(err);
            return console.error(err);
        }
        callback(null,bos); // 查询成功后执行回调函数
    });
};

/**
 * 分页查询字典列表
 * @param {query|查询条件}
 * @param {callback|回调函数}
 */
DicService.findPage = function(query,callback){
    if(!query){
        query = {};
    }
    //处理分页
    var row = query.row;
    var start = query.start;
    var options = {'$slice':2};
    options['limit'] = row;
    options['skip'] = start;
    delete query.row;
    delete query.start;
    var page = new Page();
    Dic.count(query,function(err,count){ // 查询dic数量
        if (err){
            callback(err);
            return console.error(err);
        }
        if(count===0){ // 无数据
            callback(null,page);
            return;
        }
        Dic.find(query,null,options,function (err, bos) { // 分页查询
            if (err){
                callback(err);
                return console.error(err);
            }
            page.setPageAttr(count,start/row+1,row,Math.ceil(count/row)); // 配置分页属性
            page.setData(bos); // 配置数据
            callback(null,page); // 查询成功后执行回调函数
        });
    });
};

/**
 * 更新字典信息
 * @param {bo|dicbo对象}
 * @param {callback|回调函数}
 */
DicService.update = function(bo,callback){
    //如果直接使用bo对象需要转换对象并且删除_id属性
    Dic.findOne({_id:bo._id},function(err,pro){
        if (err){
            callback(err);
            return console.error(err);
        }
        if(pro){
            bo = bo.toObject();
            var id = bo._id;
            delete bo._id;
            Dic.update({_id:id},bo,function (err, bos) {
                if (err){
                    return console.error(err);
                }else{
                    callback();
                }
            });
        }else{
            callback("不存在该字典");
        }
    });
};

/**
 * 删除字典
 * @param {id|_id}
 * @param {callback|回调函数}
 */
DicService.remove = function(id,callback){
    //物理删除
    Dic.findOneAndRemove({_id:id},function (err, bo) {
        if (err){
            callback(err);
            return console.error(err);
        }
        callback(null,bo);
    });
}

module.exports = DicService; // 导出DicService模块
