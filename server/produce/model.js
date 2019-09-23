const mongoose = require('mongoose')

const Schema = mongoose.Schema

const produce = new Schema({
  id: {
    type: String
  },
  produceName: {
    type: String,
    required: true
  },
  produceNumber: {
    type: Number,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  brand: { // 品牌
    type: String,
    required: true
  },
  qualityGuaranteePeriod: { // 保质期
    type: Number,
    required: true
  },
  content: { // 含量
    type: String,
    required: true
  },
  completeTime: { // 产品完成时间
    type: String,
    required: true
  },
  storeTime: {
    type: String
  },
  materialSelect: { // 原料数组
    type: Array,
    required: true
  },
  produceSate: { // 0新任务、1生产中、2生产完成（未入库）、3已入库、4不需要入库
    type: Number
  }
}, {
  versionKey: false,
  timestamps: true
})

const fileModel = new Schema({
  id: {
    type: String
  },
  path: {
    type: String
  },
  size: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  loadDate: {
    type: String
  }
})

const model = {
  Produce: mongoose.model('produce', produce),
  FileModel: mongoose.model('fileModel', fileModel)
}
module.exports = model
