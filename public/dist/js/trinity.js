/*
 * 时间对象格式化
 */
Date.prototype.format = function(format) {
    var o = {
        'M+': this.getMonth() + 1, // month
        'd+': this.getDate(), // day
        'h+': this.getHours(), // hour
        'm+': this.getMinutes(), // minute
        's+': this.getSeconds(), // second
        'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
        'S': this.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    return format;
};

/*
 * alert/confirm提示窗方法封装
 */
function sAlert(title, type) {
    swal({
        title: title,
        text: '2s后关闭弹窗',
        type: type,
        timer: 2000,
        showConfirmButton: false
    });
}

/**
 *
 * @param options 设置信息
 *          格式：{
 *              title： 标题，若不输入则为“确认信息”
 *              text： 提示信息，若不输入则为“您确定进行此操作？”
 *              yes： 确认按钮，若不输入则为“确定”
 *              no： 取消按钮，若不输入则为“取消”
 *          }
 * @param _function 回调函数
 */
function sConfirm(options, _function) {
    swal({
        title: options.title? options.title : '确认信息',
        text: options.text? options.text : '您确定进行此操作？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: options.yes? options.yes : '确定',
        cancelButtonText: options.no? options.no : '取消',
    }, _function);
}

/**
 *unique the array
 *@param {Array} array array to unique
 *@return {Array} uniqued array ,note change parameter
 */
Array.prototype.uniqueData = function (){
    for(var i=0;i<this.length;i++) {
        for(var j=i+1;j<this.length;j++) {
            //注意 ===
            if(this[i]===this[j]) {
                this.splice(j,1);
                j--;
            }
        }
    }
    return this;
}

/**
 * 生成length长度的全0数组
 * @param length
 * @returns {Array}
 */
function getZeroArr(length) {
    var arr = [];
    for (length; length > 0; length--) {
        arr.push(0);
    }
    return arr;
}

function checkEnd(Str, endStr){
    var arr = Str.split('-');
    var key = arr[0];
    arr.splice(0,1);
    var checkStr = '';
    if (arr.length > 1) {
        checkStr = arr.join('-');
    } else {
        checkStr = arr.toString();
    }
    if($.inArray(checkStr, endStr)>=0 && key){
        return key;
    }else{
        return -1;
    }
}

function checkEm(e, arr){
    var array = e.split('-');
    var key = array[0];
    if($.inArray(e, arr)>=0 && key){
        return key;
    }else{
        return -1;
    }
}

function getMultiOption() {
    return {
        buttonClass: 'btn btn-default btn-flat',
        buttonContainer: '<div class="btn-group" style="width:100%" />',
        buttonWidth: '100%',
        includeSelectAllOption: true,
        selectAllText: '全选',
        buttonText: function(options) {
            if (options.length == 0) {
                return '请选择 <b class="caret"></b>';
            }
            else if (options.length > 5) {
                return options.length + ' 项已选择  <b class="caret"></b>';
            }
            else {
                var selected = '';
                options.each(function() {
                    selected += $(this).text() + ', ';
                });
                return selected.substr(0, selected.length -2) + ' <b class="caret"></b>';
            }
        }
    };
}

function getSortFun(order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}
