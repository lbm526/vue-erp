const db = require('./modal')
require('../../js/Date/Udate.js')

module.exports = router => {
  //   查询支出列表
  // 多条件查询
  router.get('/api/incomeAndPay/payList', (req, res) => {
    //  删除空指针的字段
    // 进行多条件查询
    let data = JSON.parse(JSON.stringify(req.query))
    let opt = {}
    for (let key in data) {
      if (data[key] !== '') {
        opt[key] = data[key]
      }
    }
    db.PayModal.find(opt).then((list) => {
      let result = JSON.parse(JSON.stringify(list))
      res.json({
        msg: '',
        success: true,
        result: result
      })
    })
  })
  //   根据id查询支出信息
  router.get('/api/incomeAndPay/getIdByPayInfo', (req, res) => {
    db.PayModal.findOne({
      _id: req.query._id
    }).then(list => {
      res.json({
        msg: '',
        success: true,
        result: list
      })
    })
  })

  //   新增支出信息
  router.post('/api/incomeAndPay/addPay', (req, res) => {
    let data = req.body
    let year = new Date().getFullYear()
    let getMonth = new Date().getMonth() + 1
    let getDay = new Date().Format('yyyy-MM-dd')
    let day = getDay < 10 ? '0' + getDay : getDay
    let month = getMonth < 10 ? '0' + getMonth : getMonth
    const opt = {
      name: data.name,
      money: data.money,
      mark: data.mark,
      payPerson: data.payPerson,
      reason: data.reason,
      year: year,
      month: month,
      day: day,
      companyId: data.companyId
    }
    db.PayModal(opt).save(err => {
      if (err) {
        res.status(500).send({
          msg: '新增失败',
          success: false
        })
        return false
      }
      res.json({
        msg: '',
        success: true
      })
    })
  })
  //   编辑支出
  router.post('/api/incomeAndPay/editPay', (req, res) => {
    const data = req.body
    db.PayModal.updateOne({
      _id: data._id
    }, {
      $set: {
        name: data.name,
        money: data.money,
        mark: data.mark,
        payPerson: data.payPerson,
        reason: data.reason
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
  //   删除支出明细
  router.post('/api/incomeAndPay/deletePay', (req, res) => {
    db.PayModal.findOneAndRemove({
      _id: req.body._id
    }, (err, tank) => {
      if (err) {
        res.status(500).send({
          msg: '删除失败',
          success: false
        })
        return false
      }
      res.json({
        msg: '',
        success: true
      })
    })
  })
  /**
   * 收入名称集合
   */
  router.get('/api/incomeAndPay/PayNameList', (req, res) => {
    db.PayModal.find({}).then(list => {
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
        for (let key in data[i]) {
          if (key === 'name') {
            opt[key] = data[i][key]
            result.push(opt)
          }
        }
      }
      res.json({
        msg: '',
        success: true,
        result
      })
    })
  })
}
