const db = require('./model')
require('../js/Date/Udate')
module.exports = router => {
  // 增加原料
  router.post('/api/material/addMaterial', (req, res) => {
    const data = req.body
    db.Material(data).save(err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })

  //   批量删除原料
  router.post('/api/material/deleteMaterial', (req, res) => {
    const data = req.body
    let arr = []
    for (let i = 0; i < data.ids.length; i++) {
      let opt = {}
      opt['_id'] = data.ids[i]
      arr.push(opt)
    }
    db.Material.deleteMany({
      $or: arr
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })
  //   修改原料信息
  router.post('/api/material/editMaterialInfo', (req, res) => {
    const data = req.body
    db.Material.updateOne({
      _id: data._id
    }, {
      $set: data
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })
  //   查询原料列表
  router.get('/api/material/getMaterialList', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.query))
    let opt = {}
    for (let key in data) {
      if (data[key] !== '') {
        opt[key] = data[key]
      }
    }
    db.Material.find(opt).then(list => {
      res.json({
        msg: '',
        success: true,
        result: list
      })
    })
  })

  //   根据id查找原料信息
  router.get('/api/material/getMaterById', (req, res) => {
    const data = req.query
    db.Material.findOne({
      _id: data._id
    }).then(item => {
      res.json({
        msg: '',
        success: true,
        result: item
      })
    })
  })
  //   分发到采购
  router.post('/api/material/distributeToPurchase', (req, res) => {
    const data = req.body
    db.Material.updateOne({
      _id: data._id
    }, {
      $set: {
        distributeState: 1,
        purchaseState: 0,
        distributePerson: data.distributePerson
      }
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })

  //   领取采购
  router.post('/api/material/receiveBuy', (req, res) => {
    const data = req.body
    db.Material.updateOne({
      _id: data._id
    }, {
      $set: {
        purchaseState: 1,
        receivePerson: data.receivePerson,
        receiveTime: new Date().Format('yyyy-MM-dd')
      }
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })

  //   完成采购
  router.post('/api/material/completeBuy', (req, res) => {
    const data = req.body
    db.Material.updateOne({
      _id: data._id
    }, {
      $set: {
        purchaseState: 2,
        purchasePerson: data.purchasePerson,
        purchaseTime: new Date().Format('yyyy-MM-dd')
      }
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })
  //   原料入库
  router.post('/api/material/materialWarehousing', (req, res) => {
    const data = req.body
    db.Material.updateOne({
      _id: data._id
    }, {
      $set: {
        storeState: 1,
        purchaseState: 3,
        storePerson: data.storePerson,
        storeTime: new Date().Format('yyyy-MM-dd')
      }
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })

  /**
   * 仓库列表入库
   */
  router.post('/api/store/addStore', (req, res) => {
    let data = req.body
    db.Material.findOne({
      _id: data._id
    }).then(list => {
      if (list) {
        let hasNumber = list.hasNumber + data.hasNumber
        db.Material.updateOne({
          _id: data._id
        }, {
          $set: {
            hasNumber: hasNumber
          }
        }, err => {
          if (err) {
            res.json({
              msg: '入库失败',
              success: false
            })
            return false
          }
          res.json({
            msg: '',
            success: true
          })
        })
      }
    })
  })
  /**
   * 原料名称集合
   */
  router.get('/api/material/materialNameList', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.query))
    db.Material.find({
      companyId: data.companyId,
      $or: [{
        distributeState: data.distributeState
      }, {
        purchaseState: data.purchaseState
      }, {
        storeState: data.storeState
      }]
    }).then(list => {
      if (!list) {
        res.json({
          msg: '',
          success: true,
          result: []
        })
        return false
      }
      let data = JSON.parse(JSON.stringify(list))
      let result = []
      for (let i = 0; i < data.length; i++) {
        let opt = {}
        opt['_id'] = data[i]._id
        opt['material'] = data[i].material
        opt['author'] = data[i].author
        result.push(opt)
      }
      res.json({
        msg: '',
        success: true,
        result
      })
    })
  })
}
