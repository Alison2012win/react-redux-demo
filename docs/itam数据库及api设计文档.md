# IT资产管理系统说明文档 #
---
## 一、项目背景及需求 ##
<p style="text-indent: 2em;">随着团队的日益发展壮大，为了支撑越来越多的项目、产品的开发、运行及管理，团队拥有了越来越多软硬件资源，迫切需要对这些资源进行统一的管理，以提升整体的运转效率和资源的利用率。</p>

<p style="text-indent: 2em;">IT 资产指个人计算机（软件/硬件）、各种信息产品、工具和备品、租借品等等，而 IT 资产管理系统则是对 IT 资产的信息通过数据库进行一体化管理。</p>

<p style="text-indent: 2em;">具体而言，该系统对团队所有 IT 资产（现阶段主要针对服务器）的相关信息进行维护。</p>

## 二、数据库设计 ##
见 pdm 文件

## 三、api 设计 ##
> 注：api入参加*号表示必输项

### 3.1 `post` api/assets ###
**1. 功能**

新增资产

**2. 入参**

	*name: String, //服务器名称
	*ip: String, //服务器地址
	parentNode: String, //所属节点服务器名称，如虚拟机所属物理机
	*memory: Integer, //内存大小，单位G
	*slotNum: Integer, //CPU插槽数
	*coreNum: Integer, //各插槽核心数
	*hardDisk: String, //硬盘大小，含SSD
	os: Integer, //操作系统
	type: Integer, //服务器类型
	appsInfo: String, //应用部署信息，当服务器类型为应用服务器时
	admin: String, //设备负责人
	username: String, //账户信息--用户名
	password: String, //账户信息--密码，入库前加密
	state: Integer, //设备状态，不输入时默认0——停止
	mac: String, //mac地址
	accessToInternet: Boolean, //是否可访问外网，不输入时默认0——否
	info: String //服务器描述信息

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: <返回结果>
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result: NULL
		}

### 3.2 `delete` api/assets/{aid} ###
**1. 功能**

删除资产

**2. 入参**

无

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: <返回结果>
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result: NULL
		}

### 3.3 `post` api/assets/{aid} ###
**1. 功能**

修改资产信息

**2. 入参**

	*name: String, //服务器名称
	*ip: String, //服务器地址
	parentNode: String, //所属节点ID，如虚拟机所属物理机
	*memory: Integer, //内存大小，单位G
	*slotNum: Integer, //CPU插槽数
	*coreNum: Integer, //各插槽核心数
	*hardDisk: String, //硬盘大小，含SSD
	os: Integer, //操作系统
	type: Integer, //服务器类型
	appsInfo: String, //应用部署信息，当服务器类型为应用服务器时
	admin: String, //设备负责人
	username: String, //账户信息--用户名
	password: String, //账户信息--密码，入库前加密
	accessToInternet: Boolean, //是否可访问外网，不输入时默认0——否
	info: String //服务器描述信息
	isEditState:Boolean //是否只更改state
	isEditParentNode:Boolean //是否只更改parentNode

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: <返回结果>
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result: NULL
		}

### 3.4 `get` api/assets ###
**1. 功能**

获取所有服务器信息

**2. 入参**

	name: String, //服务器名称，模糊查询
	parentName: String, //所属节点服务器名称，精确查询
	ip:String, //服务器地址,精确查询
	type: Integer, //服务器类型，精确查询
	appsInfo: String, //应用部署信息，当服务器类型为应用服务器时，模糊查询
	state: Integer //设备状态，精确查询
	isAll:Boolean //是否不分页获取所有服务器信息

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: [
				"total":Integer//所有数据的个数
				{
					aid: Integer, //服务器ID
					name: String, //服务器名称
					ip: String, //服务器地址
					parentId: String, //所属节点ID
					memory: Integer, //内存大小
					slotNum: Integer, //CPU插槽数
					coreNum: Integer, //各插槽核心数
					hardDisk: String, //硬盘大小
					os: Integer, //操作系统
					type: Integer, //服务器类型
					appsInfo: String, //应用部署信息
					admin: String, //设备负责人
					username: String, //账户信息--用户名
					password: String, //账户信息--密码
					state: Integer, //设备状态
					mac: String, //mac地址
					accessToInternet: Boolean, //是否可访问外网
					info: String //服务器描述信息
				},
				"page": Integer,//当前页第几页
        		"row": Integer,//每一页显示的数据数目
        		"totalPages": Integer//一共有多少页
			]
		}

- 实例

		{
    		"result": {
        		"total": 24,
        		"data": [
            		{
                		"name": "zzy23",
                		"state": 1,
                		"type": 2,
                		"info": "",
                		"parentNode": "root",
                		"username": "admin",
                		"password": "ibjEMogz9cg=",
                		"accessToInternet": false,
                		"mac": null,
                		"slotNum": 2,
                		"hardDisk": "200G",
                		"ip": "10.154.2.166",
                		"aid": 12,
                		"coreNum": 2,
                		"memory": 2,
                		"os": 1,
                		"appsInfo": "{\"zhang\":\"250\",\"chao\":\"250\",\"yang\":\"250\"}",
                		"admin": "zhangzhaoyang"
            		}
        		],
        		"page": 1,
        		"row": 10,
        		"totalPages": 3
    		},
    		"code": 1,
    		"msg": "success"
		}

### 3.5 `get` api/assets/{aid} ###
**1. 功能**

获取单个服务器的详细信息

**2. 入参**

	无

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: {
				name: String, //服务器名称
				ip: String, //服务器地址
				parentId: String, //所属节点ID
				memory: Integer, //内存大小
				slotNum: Integer, //CPU插槽数
				coreNum: Integer, //各插槽核心数
				hardDisk: String, //硬盘大小
				os: Integer, //操作系统
				type: Integer, //服务器类型
				appsInfo: String, //应用部署信息
				admin: String, //设备负责人
				username: String, //账户信息--用户名
				password: String, //账户信息--密码
				state: Integer, //设备状态
				mac: String, //mac地址
				accessToInternet: Boolean, //是否可访问外网
				info: String //服务器描述信息
			}
		}

- 实例
	
		{
			code: 1,
			msg: 'success',
			result:  {
				name: "budme_gitserver",
				ip: "10.154.2.240",
				parentNode: "Node2",
				memory: 16,
				slotNum: 1,
				coreNum: 4,
				hardDisk: "256G",
				os: 1,
				type: 1,
				appsInfo: "{gitlab: 80}",
				admin: "周彬",
				username: "",
				password: "",
				state: 1,
				mac: "00:0C:29:CC:8d:71",
				accessToInternet: 1,
				info: ""
			}
		}


## 四、api补充
### 4.1 `get` api/dics ###
**1. 功能**

分页查询字典

**2. 入参**

	type: String, //字典类型

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: {
				data: [
					{
						value: String //字典值
						type: String, //字典类型
						code: Integer, //字典码
						did: Integer, //主键
					},
					...
				],
				"total": Integer,//字典总条数
        		"page": Integer,//当前返回数据的页数
        		"row": Integer,//分页显示一页由多少行组成
        		"totalPages": Integer//数据总页数
			}
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result: {
				data: [
					{
						"value": "gitlab服务器",
	               	 	"type": "SERVER_TYPE",
	                	"code": 1,
	                	"did": 3
					},
					...
				],
				"total": 6,
        		"page": 1,
        		"row": 10,
        		"totalPages": 1
			}
		}

### 4.2 `post` api/dics ###
**1. 功能**

新增字典，需要进行type+code的唯一性校验

**2. 入参**

	*type: String, //字典类型
	*code: Integer, //字典码
	*value: String, //字典值

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: <返回结果>
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result: NULL
		}

### 4.3 `post` api/dics/{did} ###
**1. 功能**

修改字典，只能修改Value值

**2. 入参**

	*type: String,//字典类型
	*code: Integer, //字典码
	*value: String, //字典值

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: <返回结果>
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result: NULL
		}

### 4.4 `get` api/dics/did/{did} ###
**1. 功能**
获取单个服务器字典

**2. 入参**
	无

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: {
				value: String //字典值
				type: String, //字典类型
				code: Integer, //字典码
				did: Integer, //主键
			}
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result: {
        		"value": "激活",
        		"type": "USER_STATE",
        		"code": 1,
        		"did": 1
    		}
    		
		}

### 4.5 `get` api/dics/total ###
**1. 功能**

查询字典，显示所有字典信息在一页中

**2. 入参**

无

**3. 返回结果**

- 格式

		{
			code: <状态码>,
			msg: <返回信息>,
			result: {
				"data": [
					{
						value: String //字典值
						type: String, //字典类型
						code: Integer, //字典码
						did: Integer, //主键
					},
					...
				],				
				"total": Integer,//字典总条数
        		"page": Integer,//当前页数
        		"row": Integer,//当前页行数构成
        		"totalPages": Integer//总页数
			}
		}

- 实例

		{
			code: 1,
			msg: 'success',
			result:  {
				"data"： [
					{
						"value": "gitlab服务器",
               	 		"type": "SERVER_TYPE",
                		"code": 1,
                		"did": 3
					},
					...
				],
				"total": 26,
        		"page": 1,
        		"row": 26,
        		"totalPages": 1
			}
		}