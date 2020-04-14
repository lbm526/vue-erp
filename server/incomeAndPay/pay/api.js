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

  // 查询今年收入列表
  router.get('/api/incomeAndPay/payList_year', (req, res) => {
    // 删除空指针的字段
    // 进行多条件查询
    const year = new Date().getFullYear().toString();
    // 第二个对象参数过滤不需要字段，1为显示
    db.PayModal.find({ year, companyId: req.query.companyId }, {
      "money": 1,
      "year": 1,
      "month": 1,
      "_id": 0,
    }).sort({ 'month': 1 }).then((list) => {
      let result = JSON.parse(JSON.stringify(list))
      // 将相同月的数据相加
      for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
          if (result[j].month == result[j + 1].month) {
            result[j].number += result[j + 1].number;
            result.splice(j + 1, 1);
          }
        }
      }
      const arr = [];
      // 将没有得年份加上，money为0
      for (let q = 0; q < result.length; q++) {
        for (let i = 1; i <= 12; i++) {
          if (result[q] && result[q]["month"] == i) {
            result[q]["month"] = Number(result[q]["month"])
            arr.push(result[q]);
            console.log(result[q])
            result.splice(q, 1);
            continue
          }
          arr.push({ money: 0, year: year, month: i })
        }
      }
      res.json({
        msg: '',
        success: true,
        result: arr
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
