const db = require('./model')
const uuid = require('uuid/v4')
const bcrypt = require('bcryptjs') // 密码加密
const jwt = require('jsonwebtoken');
const roleModel = require('../role/model')

// 注册、登录页面
module.exports = router => {
    router.post('/api/register', (req, res) => {
        const data = req.body
        db.User.findOne({
            phone: data.phone
        }).then(phone => {
            if (phone) {
                res.json({
                    msg: '账号已注册！',
                    success: false
                });
                return false
            }
            db.User.findOne({ email: data.email })
                .then(email => {
                    if (email) {
                        res.json({
                            msg: '邮箱已注册！',
                            success: false
                        });
                        return false
                    }
                    db.User.findOne({ companyName: data.companyName })
                        .then(companyName => {
                            if (companyName) {
                                res.json({
                                    msg: '公司已注册！',
                                    success: false
                                });
                                return false
                            }
                            const opt = {
                                companyId: uuid(),
                                userName: '老板',
                                roleId: 1,
                                roleName: '超级管理员',
                                email: data.email,
                                phone: data.phone,
                                password: data.password,
                                companyName: data.companyName,
                            }
                            // 密码加密
                            bcrypt.hash(opt.password, 10, function (err, hash) {
                                if (err) throw err
                                opt.password = hash
                                const options = {
                                    roleName: opt.roleName,
                                    companyId: opt.companyId
                                }
                                //   保存角色
                                roleModel.role(options).save((err) => {
                                    if (err) {
                                        res.status(500).send()
                                        return
                                    }
                                })
                                db.User(opt).save(function (err) {
                                    if (err) {
                                        res.status(500).send()
                                        return
                                    }
                                    const data = {
                                        msg: '',
                                        success: true
                                    }
                                    res.json(data)
                                })

                            })
                        })
                })
        })
    })
    // 登录
    router.post('/api/login', (req, res) => {
        const data = req.body
        db.User.findOne({
            phone: data.phone
        }).then(user => {
            if (!user) {
                res.json({
                    msg: '账号未注册，请先注册再登录',
                    success: false
                })
                return false
            }
            bcrypt.compare(data.password, user.password, function (err, tank) {
                if (!tank) {
                    res.json({
                        msg: '密码错误！',
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
                var accent_token = jwt.sign(rule, 'secret', {
                    expiresIn: '3h'
                });
                // var accent_token = jwt.sign(rule, 'secret_' + user._id, {
                //     expiresIn: '3h'
                // });
                // 更新令牌
                // var refresh_token = jwt.sign({
                //     rule
                // }, 'refreshSecret_' + user._id, {
                //     expiresIn: '12h'
                // });
                const result = {
                    accent_token: accent_token,
                    // refresh_token: refresh_token,
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
                    msg: '',
                    success: true,
                    result
                })
            });
        })

    })

    // 刷新token令牌
    router.post('/api/token/refreshToken', (req, res) => {
        console.log('dhga')
        const refreshToken = req.headers['authorization'];
        console.log(refreshToken)
        if (refreshToken) {
            jwt.verify(refreshToken, 'refreshSecret_' + data.party_id, (err, decoded) => {
                if (err) {
                    switch (err.name) {
                        case 'JsonWebTokenError':
                            res.status(401).send({
                                code: -1,
                                msg: '无效的token'
                            });
                            break;
                        case 'TokenExpiredError':
                            res.status(401).send({
                                code: -1,
                                msg: 'token过期'
                            });
                            break;
                    }
                } else {
                    console.log('aaa', decoded)
                    res.json({
                        result: 'aaa'
                    })
                    // next()
                }
            })
        }
    })
}