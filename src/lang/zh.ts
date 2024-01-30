export default {
	// route list(sideBar)
	route: {
		Dashboard: '首页',
		Permission: '权限控制',
		RolePermission: '角色权限',
		DirectivePermission: '指令权限',
		Charts: '图表',
		InboundChart: '入库图',
		OutboundChart: '出库图',
		page401: '401',
		page404: '404',
		ErrorLog: '错误日志',
		Stock: '库存管理',
		Order: '订单管理',
		Inbound: '入库订单',
		Outbound: '出库订单',
		ExternalLink: '外链',
		Financial: '财务管理',
		income: '收入',
		expend: '支出'
	},

	// login page
	login: {
		name: '仓库后台管理系统',
		loginForm: '登录页面',
		login: '登录',
		username: '账号',
		password: '密码',
		any: '随便填',
		thirdparty: '第三方登录',
		thirdpartyTips: '结合业务进行模拟！！！',
		wechat: '微信登录',
		qq: 'QQ登录'
	},

	// Dashboard page
	dashboard: {
		profit: '收益',
		orders: '订单量',
		inbound: '入库',
		outbound: '出库',
		month: '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
		orderID: '订单ID',
		total: '总价',
		area: '库区',
		todoList: '添加备忘',
		item: '项',
		left: '未完成',
		all: '全部',
		active: '待做',
		completed: '已完成'
	},

	// permission page
	permission: {
		newRole: '新增角色',
		editRole: '编辑',
		key: '关键字',
		name: '名称',
		description: '角色描述',
		desc: '角色描述',
		operations: '操作',
		menus: '权限菜单',
		roles: '你的权限',
		switchRoles: '切换权限'
	},

	// errorLog page
	errorLog: {
		errorLog: '错误日志',
		clear: '清除全部',
		msg: '报错',
		info: '信息',
		url: '接口地址',
		message: '报错详情',
		stack: '堆栈',
		errorReport: '错误上报'
	},

	// charts page
	charts: {
		turnover: '营业额',
		orders: '订单量',
		month: '月'
	},

	// stock page
	stock: {
		orderID: '订单ID',
		title: '产品名称',
		specs: '产品规格',
		quantity: '数量',
		mass: '产品质量',
		actions: '操作',
		warehouse: '仓库'
	},

	// orders page
	orders: {
		orderID: '订单ID',
		title: '产品',
		date: '日期',
		specs: '产品规格',
		quantity: '数量',
		price: '价格',
		total: '总价',
		actions: '操作',
		warehouse: '仓库',
		client: '客户',
		type: '入库类型',
		normal: '正常入库',
		return: '退货入库',
		sell: '采购出库',
		purchase: '销售出库',
		supplier: '供应商',
		documenter: '制单人',
		auditor: '审核人',
		status: '订单状态',
		wait: '等待审核',
		success: '审核成功',
		fail: '审核失败',
		number: '电话',
		contact: '联系人',
		remark: '备注',
		reason: '审核原因',
		productionID: '产品编码',
		productionName: '产品名称',
		area: '库区',
		detail: '入库单详情',
		audit: '入库单审核',
		inboundProduction: '入库产品信息',
		create: '新增入库单',
		update: '更新入库单'
	},

	settings: {
		title: '页面样式设置',
		color: '主题颜色',
		tagsView: '打开标签视图',
		fix: '固定头部',
		logo: '侧边栏图标'
	},

	headers: {
		Search: '搜索',
		Export: '导出',
		Add: '添加',
		type: '单据类型',
		area: '库区',
		status: '订单状态',
		orderID: '订单ID'
	},

	tips: {
		warning: '提示',
		cancelTip: '确定移除该角色？',
		deleteMsg_success: '删除成功!',
		updateMsg_success: '更新成功!',
		createMsg_success: '创建成功!',
		submit_success: '提交成功!',
		audit_success: '审核完成!',
		deleteMsg_fail: '删除失败!',
		updateMsg_fail: '更新失败!',
		createMsg_fail: '创建失败!'
	},

	button: {
		edit: '编辑',
		delete: '删除',
		submit: '提交',
		cancel: '取消',
		confirm: '确定',
		scan: '扫描',
		audit: '审核',
		detail: '查看',
		pass: '审核通过',
		noPass: '审核不通过',
		createProduction: '新增产品'
	},

	AutoGeneration: '可自动生成',
	require: '为必填'
}
