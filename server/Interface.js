/**
 * 集成所有api
 */
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const db = require('./user/model')

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

    if (req.url == '/api/login' || req.url == '/api/register' || req.url == '/api/token/refreshToken') {
        next()
    } else {
        const token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, 'secret', (err, decoded) => {
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
                    next()
                }
            })
        }
    }

})

// 刷新token令牌
router.post('/api/token/refreshToken', (req, res) => {
    const data = req.body
    const refreshToken = req.headers['authorization'];
    if (refreshToken) {
        console.log('aaa')
        jwt.verify(refreshToken, 'refreshSecret_' + data.party_id, (err, decoded) => {
            if (err) {
                switch (err.name) {
                    case 'JsonWebTokenError':
                        res.status(401)
                        break;
                    case 'TokenExpiredError':
                        res.status(401)
                        break;
                }
            } else {
                let _id = decoded.rule.id
                db.User.findOne({
                    _id
                }).then(user => {
                    if (!user) {
                        res.json({
                            msg: '账号未注册，请先注册再登录',
                            success: false
                        })
                        return false
                    }
                    const rule = {
                        id: user._id,
                        phone: user.phone,
                        email: user.email
                    };
                    // 返回token
                    var accent_token = jwt.sign(rule, 'secret_' + user._id, {
                        expiresIn: 10
                    });
                    // 更新令牌
                    var refresh_token = jwt.sign({
                        rule
                    }, 'refreshSecret_' + user._id, {
                        expiresIn: '12h'
                    });
                    const result = {
                        accent_token: accent_token,
                        refresh_token: refresh_token,
                        _id: user._id,
                        companyId: user.companyId,
                        userName: user.userName,
                        roleId: user.roleId,
                        roleName: user.roleName,
                        email: user.email,
                        phone: user.phone,
                        companyName: user.companyName,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                    res.json({
                        code: 10001, //更新token成功标识
                        msg: '',
                        success: true,
                        result
                    })
                })
            }
        })
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