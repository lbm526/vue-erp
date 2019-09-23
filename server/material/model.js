const mongoose = require('mongoose')

const Schema = mongoose.Schema

const material = new Schema({
  material: {
    required: true,
    type: String
  },
  hasNumber: {
    required: true,
    type: Number
  },
  purpose: { // 用途
    required: true,
    type: String
  },
  author: { // 原料建立人
    required: true,
    type: String
  },
  companyId: {
    type: String
  },
  mark: {
    type: String
  },
  distributeState: { // 分发状态：0未分发，1已分发
    type: Number
  },
  purchaseState: { // 采购状态：0未采购，1采购中，2采购完成, 3已入库
    type: Number
  },
  storeState: { // 入库状态：0未入库，1已入库
    type: Number
  },
  receiveTime: { // 领取时间
    type: String
  },
  distributeTime: { // 分发时间
    type: String
  },
  purchaseTime: { // 采购时间
    type: String
  },
  storeTime: { // 入库时间
    type: String
  },
  distributePerson: { // 分发人
    type: String
  },
  receivePerson: { // 领取人
    type: String
  },
  purchasePerson: { // 采购人
    type: String
  },
  storePerson: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})

const modal = {
  Material: mongoose.model('material', material)
}

module.exports = modal
