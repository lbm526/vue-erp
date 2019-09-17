const db = require('./model')
const roleDb = require('../role/model')
const bcrypt = require('bcryptjs') // 密码加密

module.exports = router => {
    // 获取用户列表
    router.get('/api/user/userList', (req, res) => {
            db.User.find({}).then((list) => {
                // 深拷贝
                let data = JSON.parse(JSON.stringify(list))
                let result = []
                for (let i = 0; i < data.length; i++) {
                    let parmas = {}
                    let opt = data[i]
                    for (let j in opt) {
                        if (j !== 'password') {
                            parmas[j] = opt[j]
                        }
                    }
                    result.push(parmas)
                }
                res.json({
                    msg: '',
                    success: true,
                    result: result
                })
            })
        })
        //   根据id获取用户信息
    router.get('/api/user/findUserInfo', (req, res) => {
            db.User.findOne({
                _id: req.query._id
            }).then(info => {
                const data = JSON.parse(JSON.stringify(info))
                let opt = {}
                for (let key in data) {
                    if (key !== 'password') {
                        opt[key] = data[key]
                    }
                }
                res.json({
                    msg: '',
                    success: true,
                    result: info
                })
            })
        })
        // 添加新用户
    router.post('/api/user/addUser', function(req, res) {
        db.User.findOne({
                $or: [{
                        phone: req.body.phone
                    },
                    {
                        email: req.body.email
                    }
                ]
            })
            .then(user => {
                if (user) {
                    res.json({
                        msg: '账号已注册!',
                        success: false
                    })
                    return false
                }
                let userInfo = {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone,
                    roleId: req.body.roleId
                        // userId: uuid()
                }
                roleDb.role.findOne({
                    roleId: req.body.roleId
                }).then(name => {
                    userInfo['roleName'] = name.roleName
                        // eslint-disable-next-line handle-callback-err
                    bcrypt.hash(userInfo.password, 10, function(err, hash) {
                        if (err) throw err
                        userInfo.password = hash
                        db.User(userInfo).save(function(err) {
                            if (err) {
                                res.status(500).send()
                                return
                            }
                            const data = {
                                msg: '',
                                success: true
                            }
                            res.json(data)
                            res.send()
                        })
                    })
                })
            })
    })

    //   编辑用户
    router.post('/api/user/editUserInfo', (req, res) => {
            const data = req.body
                // 寻找是否存在相同账号（自身除外）
            db.User.findOne({
                phone: data.phone
            }).then(phone => {
                // eslint-disable-next-line eqeqeq
                if (phone && phone._id != data._id) {
                    res.json({
                        msg: '账号已存在',
                        success: false
                    })
                    return false
                }
                db.User.findOne({
                    email: data.email
                }).then(email => {
                    // eslint-disable-next-line eqeqeq
                    if (email._id != data._id) {
                        res.json({
                            msg: '邮箱已存在',
                            success: false
                        })
                        return false
                    }
                    db.User.updateOne({
                        _id: data._id
                    }, {
                        '$set': {
                            userName: data.userName,
                            phone: data.phone,
                            roleId: data.roleId,
                            email: data.email
                        }
                    }, (err) => {
                        if (err) {
                            res.status(500).send()
                            return
                        }
                        res.json({
                            msg: '',
                            success: true
                        })
                    })
                })
            })
        })
        //   删除用户
    router.post('/api/user/deleteUserInfo', (req, res) => {
            db.User.findByIdAndRemove({
                _id: req.body._id
            }, (err, tank) => {
                if (err) {
                    res.json({
                        msg: '删除失败'
                    })
                    return false
                }
                res.json({
                    msg: '',
                    success: true
                })
            })
        })
        //   检索原密码是否正确
    router.get('/api/user/searchPassword', (req, res) => {
            db.User.findOne({
                _id: req.query._id
            }).then((pass) => {
                if (!pass) {
                    res.json({
                        msg: '',
                        success: false,
                        oldPasswordErr: '账号不存在'
                    })
                } else {
                    bcrypt.compare(req.query.oldPassword, pass.password, (err, tank) => {
                        if (err) {
                            res.json({
                                msg: err,
                                success: false
                            })
                        }
                        if (!tank) {
                            res.json({
                                msg: '',
                                success: false,
                                result: {
                                    vuelidate: false
                                },
                                errorText: '原密码错误'
                            })
                            return false
                        }
                        res.json({
                            msg: '',
                            success: true,
                            result: {
                                vuelidate: true
                            }
                        })
                    })
                }
            })
        })
        //   修改密码
    router.post('/api/user/changPassword', (req, res) => {
        db.User.findOne({
            _id: req.body._id
        }).then((pass) => {
            if (!pass) {
                res.json({
                    msg: '',
                    success: false,
                    oldPasswordErr: '账号不存在'
                })
                return false
            }
            let password = req.body.newPassword
            bcrypt.hash(password, 10, function(err, hash) {
                if (err) throw err
                password = hash
                db.User.updateOne({
                    _id: req.body._id
                }, {
                    '$set': {
                        password
                    }
                }, err => {
                    if (err) {
                        res.json({
                            msg: '修改失败'
                        })
                        return false
                    }
                    res.json({
                        msg: '',
                        success: true
                    })
                })
            })
        })
    })
}