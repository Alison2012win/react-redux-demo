/**
 * Created by Panda on 2015/8/21.
 */
Array.prototype.remove=function(value){
    var len = this.length;
    for(var i=0,n=0;i<len;i++){//把出了要删除的元素赋值给新数组
        if(this[i]!=value){
            this[n++]=this[i];
        }
    }
    this.length = n;
};
function sqlparser(sql){
    sql = sql.replace(/\n/g," ");
    var groupstart = sql.search(/group by/i);
    var selectend = sql.search(/from/i);
    var groupend = sql.search(/order by/);
    var group = "";
    var select = sql.substring(7,selectend);
    if(groupstart > 0){
        if(groupend > 0){
            group = sql.substring(groupstart+9,groupend)+ " ";
        }else{
            group =  sql.substring(groupstart+9,sql.length)+ " ";
        }
    }

    function fun(str){
        var list = [];
        var obj = {};
        var start = -1;
        var key = "";
        var flag = true;
        var dou = true;
        var theads = [];
        var as = [];
        for(var i = 0;i < str.length;i++){
            if(flag && str[i] != " "){
                start = i;
                dou = true;
                flag = false;
            }else if(str[i] === '('){
                key  = str.substring(start,i);
                start = i;
                dou = false;
            }else if(str[i] === ')'){
                var li = [];
                var o = true;
                for(var k in obj){
                    if(k === key){
                        obj[k].push(str.substring(start,i+1));
                        o = false
                    }
                }
                if(o){
                    li.push(str.substring(start,i+1));
                    obj[key] = li;
                }
                i = i+1;
                start = i;
                flag = true;
            }else if(dou && str[i] === ',' || i == str.length - 1){
                list.push(str.substring(start,i));
                start = i+1;
            }
        }
        list.remove("");
        for (var i = 0;i < list.length;i++){
            var k = list[i].split(" ");
            k.remove("");
            if(k.length === 1 && list[i] != ")"){
                theads.push(k[0]);
                as.push(k[0]);
            }else if(k.length > 1){
                as.push(k[1]);
            }
        }
        for(var k in obj){
            switch (k){
                case "count":
                    var list = obj[k];
                    for(var i = 0;i  < list.length;i++){
                        var arr = list[i].split(" ");
                        arr.remove("");
                        theads.push(arr[1].substring(0,arr[1].length-1));
                    }
                    break;
                case "substr" :
                    var list = obj[k];
                    for(var i = 0;i  < list.length;i++) {
                        var arr = list[i].split(",");
                        arr.remove("");
                        theads.push(arr[0].substring(1, arr[0].length));
                    }
                    break;
            }
        }
        theads.remove("timestamp");
        var ret = {};
        ret.as = as;
        ret.theads = theads;
        return ret;
    }
    var ret = {};
    ret["select"] = fun(select).as;
    ret["group"] = fun(group).theads;
    return(ret);
}
