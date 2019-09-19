/**
 * 集成所有api
 */
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

// 全局拦截请求
// 验证token
// token: 'secret_' + user._id
// refreshToken: 'refreshSecret_' + user._id
router.all('*', (req, res, next) => {
    let data = {}
    if (req.method == 'GET') {
        data = req.query
    } else if (req.method == 'POST') {
        data = req.body
    }
    const token = req.headers['authorization'];
    console.log(req.url)
    console.log('参数', data)
    console.log('token', token)
    if (req.url == '/api/login') {
        next()
    } else {
        console.log('secret_' + data.party_id)

        if (token) {
            jwt.verify(token, 'secret_' + data.party_id, (err, decoded) => {
                console.log(err)
                if (err) {
                    switch (err.name) {
                        case 'JsonWebTokenError':
                            res.status(403).send({
                                code: -1,
                                msg: '无效的token'
                            });
                            break;
                        case 'TokenExpiredError':
                            res.status(403).send({
                                code: -1,
                                msg: 'token过期'
                            });
                            break;
                    }
                } else {
                    console.log(decoded)
                    next()
                }
            })
        }
    }

})
require('./user/api')(router) // 用户模块
require('./role/api')(router) // 角色模块
require('./incomeAndPay/income/api')(router) // 收入模块
require('./incomeAndPay/pay/api')(router) // 支出模块
require('./material/api')(router) // 原料、原料仓库、采购
require('./produce/api')(router) // 生产管理
require('./user/registerAndLogin_api')(router) // 注册
module.exports = router