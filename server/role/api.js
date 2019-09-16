const db = require('./model')

module.exports = router => {
  // 添加角色
  router.post('/api/roleManage/addRole', (req, res) => {
    db.role.findOne({
      roleName: req.body.roleName
    }).then(User => {
      // console.log(role)
      // return
      if (User) {
        res.json({
          msg: '角色已存在',
          success: false
        })
        return false
      } else {
        const options = {
          roleName: req.body.roleName
        }
        //   保存角色
        db.role(options).save((err) => {
          if (err) {
            res.status(500).send()
            return
          }
          res.json({
            msg: '',
            success: true
          })
        })
      }
    })
  })

  //  编辑角色信息
  router.post('/api/roleManage/editRole', (req, res) => {

    db.role.updateOne({
      roleId: req.body.roleId
    }, {
      $set: {
        roleName: req.body.roleName
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

  //   删除角色
  router.post('/api/roleManage/deleteRole', (req, res) => {
    db.role.findOneAndRemove({
      roleId: req.body.roleId
    }, (err, tank) => {
      if (err) {
        res.json({
          msg: '删除失败',
          success: false
        })
        return
      }
      res.json({
        msg: '',
        success: true
      })
    })
  })
  // 查询角色列表
  router.get('/api/roleManage/roleList', (req, res) => {
    db.role.find({}, (err, data) => {
      if (err) {
        res.status(500).send()
        return
      }
      res.json({
        msg: '',
        success: true,
        result: data
      })
    })
  })
}
