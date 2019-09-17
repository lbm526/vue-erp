const db = require('./model')
const uuid = require('uuid/v4')
const bcrypt = require('bcryptjs') // 密码加密
const jwt = require('jsonwebtoken');


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
                                bcrypt.hash(opt.password, 10, function(err, hash) {
                                    if (err) throw err
                                    opt.password = hash
                                    db.User(opt).save(function(err) {
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
            bcrypt.compare(data.password, user.password, function(err, tank) {
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
                var accent_token = jwt.sign(rule, 'secret_' + user._id, {
                    expiresIn: '1h'
                });
                // 更新令牌
                var refresh_token = jwt.sign({
                    rule
                }, 'refreshSecret_' + user._id, {
                    expiresIn: '12h'
                });
                const result = {
                    accent_token: "Bearer " + accent_token,
                    refresh_token: "Bearer " + refresh_token,
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
}