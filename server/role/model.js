const mongoose = require('mongoose')
require('../js/Date/Udate.js')
const autoIncrement = require('mongoose-auto-increment') // 创建自增id
const conn = mongoose.connection
autoIncrement.initialize(conn) // 初始化自增id插件

const Schema = mongoose.Schema
const roleModel = new Schema({
  roleName: {
    required: true,
    type: String
  },
  roleId: {
    type: Number
  },
  createDate: {
    type: String,
    default: new Date().Format('yyyy-MM-dd hh:mm:ss')
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createDate'
  }
})
roleModel.plugin(autoIncrement.plugin, {
  model: 'role',
  field: 'roleId',
  startAt: 1,
  incrementBy: 1
})
const model = {
  role: mongoose.model('role', roleModel)
}
module.exports = model
