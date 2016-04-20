/**
 * 资产模块服务层
 * @type {asset|exports}
 */
var Asset = require('./model/assetbo'); // 导入aserbo模块
var Page = require('../../common/page'); // 导入page模块

function AssetService(){  // 声明AserService函数

}

/**
 * 查询单个资产
 * @param {query|查询条件}
 * @param {callback|回调函数}
 */
AssetService.find = function(query,callback){
    Asset.findOne(query,function(err,ret){
        if(err) {
            callback(err);
        }
        callback(null,ret);
    })
}

/**
 * 保存资产
 * @param {bo|assetbo对象}
 * @param {callback|回调函数}
 */
AssetService.save = function(bo,callback){
    bo.save(function (err, bo) { // mongoose中model对象的save方法
        if (err) {
            callback(err);
            return console.error(err);
        }
        callback(null, bo); // 保存成功后执行回调函数
    });
}

/**
 * 查询资产列表
 * @param {query|查询条件}
 * @param {callback|回调函数}
 */
AssetService.findList = function(query,callback){
    Asset.find(query,function(err,bos){
        if (err) {
            callback(err);
            return console.error(err);
        }
        callback(null,bos);
    });
}

/**
 * 分页查询资产列表
 * @param {query|查询条件}
 * @param {callback|回调函数}
 */
AssetService.findPage = function(query,callback){
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
    Asset.count(query,function(err,count){ // 查询asset数量
        if (err){
            callback(err);
            return console.error(err);
        }
        if(count===0){ // 无数据
            callback(null,page);
            return;
        }
        Asset.find(query, null, options, function (err, bos) { // 分页查询
            if (err) {
                callback(err);
                return console.error(err);
            }
            page.setPageAttr(count,start/row+1,row,Math.ceil(count/row)); // 配置分页属性
            page.setData(bos); // 配置数据
            callback(null, page); // 查询成功后执行回调函数
        });
    });
}

/**
 * 更新资产信息
 * @param {bo|assetbo对象}
 * @param {callback|回调函数}
 */
AssetService.update = function(bo,callback){
    //如果直接使用bo对象需要转换对象并且删除_id属性
    Asset.findOne({_id:bo._id},function(err,pro){
        if (err){
            callback(err);
            return console.error(err);
        }
        if(pro){
            bo = bo.toObject();
            var id = bo._id;
            delete bo._id;
            delete bo.creatDate;//新建时间不变
            Asset.update({_id:id},bo,function (err, bos) {
                if (err){
                    return console.error(err);
                }else{
                    callback();
                }
            });
        }else{
            callback("不存在该资产");
        }
    });
}

/**
 * 删除资产
 * @param {id|_id}
 * @param {callback|回调函数}
 */
AssetService.remove = function(id,callback){
    //物理删除
    Asset.findOneAndRemove({_id:id},function (err, bo) {
        if (err){
            callback(err);
            return console.error(err);
        }
        callback(null,bo);
    });
}

module.exports = AssetService; // 导出AssetService模块

