# budnode 开发指导

budnode是基于`express4.X` `mongoosejs` 构建的全栈式web开发框架

## 环境搭建

### nodejs 安装

使用内网已有安装包 node-v0.12.4-x64.msi或者下载最新安装包
 
+ [内网下载]()

+ [外网下载 https://nodejs.org/download/](https://nodejs.org/download/) 

安装完成后cmd中使用`node -v`和`npm -v`进行验证是否安装成功

### 重要配置

设置代理（taobao）

    npm config set registry http://registry.npm.taobao.org

### 关键全局包安装

experss 安装

    npm install -g express-generator@4

supervisor安装

    npm install supervisor -g

### IDE webstorm 

统一开发工具为webstorm 使用内网已有的安装包 或者官网下载相关安装包

+ [内网下载]()

+ [官网下载](https://www.jetbrains.com/webstorm/download/) 

### 数据库 mongodb

#### 安装

使用内网已有安装包 node-v0.12.4-x64.msi或者下载最新安装包
 
+ [内网下载]()

+ [外网下载 https://www.mongodb.org/downloads](https://www.mongodb.org/downloads) 

#### 启停

如安装路径为： `D:\db\mongodb` 数据存储路径为 `D:\db\mongodb\data\test`

安装目录下生成如下bat 执行

    D:\db\mongodb\bin\mongod.exe -dbpath D:\db\mongodb\data\test

####打包成windows服务方式

安装目录下生成如下bat 执行

    sc.exe create MongoDB binPath= "\"D:\db\mongodb\bin\mongod.exe\" --service --config=\"D:\db\mongodb\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

mongod.cfg 文件内容
    
    logpath=D:\db\mongodb\log\mongod.log
    dbpath=D:\db\mongodb\data\test

#### 可视化客户端 Robomongo

可视化的客户端使用 Robomongo 使用内网已有安装包或者下载最新安装包
 
+ [内网下载]()

+ [外网下载 http://www.robomongo.org/](http://www.robomongo.org/)

### 其他

版本控制工具统一为git

## 起步

### 脚手架

下载最新的空项目，地址：  

    git clone git@10.1.64.87:budnode/budnode-core.git


### 数据库

数据库配置文件： 复制`db/db.default.js`到同级目录下，文件名为`db.js`  中修改用户名密码ip端口数据库名称（注释的部分为简写）

    var mongoose = require('mongoose');
    //mongoose.connect('mongodb://localhost/database');
    mongoose.connect('mongodb://user:pass@localhost:port/database');
    module.exports = mongoose
    


### 分层

代码文档结构如下

    |--bin
        |--www //启动
    |--common
    |--db
        |--db.default.js //数据库配置模板
        |--db.js //数据库配置
    |--node_modules
    |--public //静态文件
    |--routes  //路由层
        |--api.js 
        |--user //演示用户模块路由层
            |--user.js
    |--service //服务层
        |--common 
        |--user //演示用户模块服务层
            |--model
                 |--userbo.js            
            |--userservice.js
    |--view //ejs模板
    |--test //测试层
    |--.gitignore
    |--app.js
    |--package.json
    
代码文档结构如上，后端服务端代码主要分为两层 路由层和服务层

#### 路由层

路由层主要职责为定制url规范，交互前后端数据，设置请求拦截器

#### 服务层

服务层主要职责为对象模块提供相应的业务逻辑。供路由层使用

使用mongodb进行对象模块操作的和数据库交互也在该层，数据库层面的数据交互参考`mongoosejs`  [官方文档http://mongoosejs.com/docs/api.html](http://mongoosejs.com/docs/api.html)

## 运行

两种方式运行 

node原生运行方式 ，配合IDE可以进行断点跟踪，修改代码后必须重新运行

    node bin/www
    
supervisor 运行，可以实现热部署功能，修改代码或者代码异常后自动重启

    supervisor bin/www
    
web访问（端口在bin/www中可以修改）
    
    http://localhost:3000/
    
## 测试

待完善