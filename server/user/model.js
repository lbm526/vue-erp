const mongoose = require('mongoose')
require('../js/Date/Udate.js')

const Schema = mongoose.Schema

// 用户
const userModel = new Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roleId: {
    type: Number,
    required: true
  },
  roleName: {
    type: String
  },
  userName: {
    type: String,
    required: true
  },
  createDate: {
    type: String,
    default: new Date().Format('yyyy-MM-dd hh:mm:ss')
  }
}, {
  versionKey: false,
  timestamps: true
})

const Models = {
  User: mongoose.model('User', userModel)
}

module.exports = Models
