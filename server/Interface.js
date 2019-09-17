/**
 * 集成所有api
 */
const express = require('express')
const router = express.Router()

require('./user/api')(router) // 用户模块
require('./role/api')(router) // 角色模块
require('./incomeAndPay/income/api')(router) // 收入模块
require('./incomeAndPay/pay/api')(router) // 支出模块
require('./material/api')(router) // 原料、原料仓库、采购
require('./produce/api')(router) // 生产管理
require('./register/api')(router) // 注册
module.exports = router