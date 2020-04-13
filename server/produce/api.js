const db = require('./model')
const formidable = require('formidable')
const uuid = require('uuid/v4')
const fs = require('fs')
require('../js/Date/Udate')

module.exports = router => {
  // 表单上传
  router.post('/api/produce/upload', (req, res) => {
    // formidable会自动保存文件，不需使用fs写入流写入
    // 如需要重命名，使用fs.rename
    var form = new formidable.IncomingForm()
    // 设置文件上传存放地址
    // 执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.uploadDir = './images' // 文件存放目录
    form.keepExtensions = true // 带上扩展名
    form.parse(req, function (_err, fields, files) {
      // files能获取到图片的信息
      // fields能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到
      let id = uuid() // 生成随机的id
      let opt = {
        id,
        produceSate: 0,
        companyId: JSON.parse(fields.companyId)
      }
      //   参数处理
      fields = JSON.parse(JSON.stringify(fields))
      for (let key in fields) {
        opt[key] = JSON.parse(fields[key])
      }

      db.Produce(opt).save((err) => {
        if (err) throw err
      })
      if (JSON.stringify(files) !== '{}') {
        let fileParam = files.file
        let fileOpt = {
          id
        } //   文件信息处理
        fileOpt['size'] = fileParam.size
        fileOpt['path'] = fileParam.path
        fileOpt['name'] = fileParam.name
        fileOpt['type'] = fileParam.type
        fileOpt['loadDate'] = fileParam.lastModifiedDate
        db.FileModel(fileOpt).save((err) => {
          if (err) throw err
        })
      }
      res.json({
        msg: '',
        success: true
      })
    })
  })

  //   删除表单
  router.post('/api/produce/deleteProduceList', (req, res) => {
    const data = req.body
    db.Produce.findOneAndRemove({
      id: data.id
    }, (err) => {
      if (err) throw err
    }).then(function () {
      db.FileModel.findOneAndRemove({
        id: data.id
      }, (err, img) => {
        if (err) throw err
        fs.unlink('./' + img.path, () => {
          res.json({
            msg: '',
            success: true
          })
        }) // 删除images文件下相对应的图片
      })
    })
  })

  // 查询成产列表
  router.get('/api/produce/getProduceList', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.query))
    let opt = {}
    for (let key in data) {
      if (data[key] !== '') {
        opt[key] = data[key]
      }
    }
    db.Produce.find(opt).then(list => {
      res.json({
        msg: '',
        success: true,
        result: list
      })
    })
  })

  // 根据id查询生产列表内容
  router.get('/api/produce/getProduceById', (req, res) => {
    const data = req.query
    db.Produce.findOne({
      id: data.id
    }, (_err, list) => {
      if (_err) throw _err
      if (list) {
        res.json({
          msg: '',
          success: true,
          result: list
        })
      }
    })
  })

  //   编辑生产信息
  //   相对添加新传入id
  //   TODO待测
  router.post('/api/produce/editProduceInfo', (req, res) => {
    var form = new formidable.IncomingForm()
    // 设置文件上传存放地址
    // 执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.uploadDir = './images' // 文件存放目录
    form.keepExtensions = true // 带上扩展名
    form.parse(req, function (_err, fields, files) {
      // files能获取到图片的信息
      // fields能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到
      let opt = {}
      //   参数处理
      fields = JSON.parse(JSON.stringify(fields))
      for (let key in fields) {
        opt[key] = JSON.parse(fields[key])
      }
      db.Produce.updateOne({
        id: JSON.parse(fields.id)
      }, {
        $set: opt
      }, (err, tank) => {
        if (err) throw err
        if (JSON.stringify(files) !== '{}') {
          let fileParam = files.file
          let fileOpt = {} //   文件信息处理
          fileOpt['size'] = fileParam.size
          fileOpt['path'] = fileParam.path
          fileOpt['name'] = fileParam.name
          fileOpt['type'] = fileParam.type
          fileOpt['loadDate'] = fileParam.lastModifiedDate
          db.FileModel.findOne({
            id: JSON.parse(fields.id)
          }, (err, list) => {
            if (err) throw err
            if (list) {
              fs.unlinkSync('./' + list.path) // 删除images文件下相对应的图片
              db.FileModel.updateOne({
                id: JSON.parse(fields.id)
              }, {
                $set: fileOpt
              }, (err, tank) => {
                if (err) throw err
                res.json({
                  msg: '',
                  success: true
                })
              })
            } else {
              res.send()
            }
          })
        } else {
          res.json({
            msg: '',
            success: true
          })
        }
      })
    })
  })

  //   领取生产任务
  //   更新状态为1
  router.post('/api/produce/receiveOrder', (req, res) => {
    const data = req.body
    db.Produce.findOneAndUpdate({
      id: data.id
    }, {
      $set: {
        produceSate: 1
      }
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })

  //   完成生产产品
  router.post('/api/produce/completeOrder', (req, res) => {
    const data = req.body
    db.Produce.findOneAndUpdate({
      id: data.id
    }, {
      $set: {
        produceSate: 2
      }
    }, err => {
      if (err) throw err
      res.json({
        msg: '',
        success: true
      })
    })
  })

  //   文件下载
  router.get('/api/produce/downloadFile', (req, res) => {
    const data = req.query
    db.FileModel.findOne({
      id: JSON.parse(data.id)
    }, (errT, file) => {
      if (errT) {
        res.json({
          msg: '下载失败',
          success:false
        })
      }
      if (file) {
        // 文件下载
        let paths = file.path
        let name = file.name
        res.download(paths, name)
      }
    })
  })

  /**
   * 产品名称集合
   */
  router.get('/api/produce/produceNameList', (req, res) => {
    const data = JSON.parse(JSON.stringify(req.query))
    db.Produce.find({
      produceSate: data.produceSate,
      companyId: data.companyId
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
        for (let key in data[i]) {
          if (key === 'produceName') {
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

  /**
   * 各类产品占比
   */
  router.get('/api/produce/proportion', (req, res) => {
    const data = req.query
    const array = []
    db.Produce.find({
      produceSate: data.produceSate,
      companyId: data.companyId
    }).then(list => {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          let opt = {}
          opt['name'] = list[i].produceName
          opt['value'] = list[i].produceNumber
          array.push(opt)
        }
      }
      res.json({
        msg: '',
        success: true,
        result: array
      })
    })
  })
  /**
   * 完成产品前10名
   */
  router.get('/api/produce/topTen', (req, res) => {
    const data = req.query
    db.Produce.find({
      companyId: data.companyId
    }).sort({
      'produceNumber': -1
    }).limit(10).then(list => {
      let opt = {
        lineLength: [],
        lineSeriesData: []
      }
      if (list) {
        for (let i = 0; i < list.length; i++) {
          opt.lineLength.push(list[i].produceName)
          opt.lineSeriesData.push(list[i].produceNumber)
        }
      }
      res.json({
        msg: '',
        success: true,
        result: opt
      })
    })
  })

  /** 产品入库 */
  router.post('/api/produce/goToStore', (req, res) => {
    let data = req.body
    let storeTime = new Date().Format('yyyy-MM-dd')
    db.Produce.findOneAndUpdate({
      _id: data._id
    }, {
      $set: {
        produceSate: 3,
        storeTime
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
  })

  /** 产品不需入库 */
  router.post('/api/produce/notNeedStore', (req, res) => {
    let data = req.body
    db.Produce.findOneAndUpdate({
      _id: data._id
    }, {
      $set: {
        produceSate: 4
      }
    }, err => {
      if (err) {
        res.json({
          msg: '操作失败',
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
}
