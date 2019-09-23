const mongoose = require('mongoose')
require('../../js/Date/Udate.js')

const Schema = mongoose.Schema
const income = new Schema({
  name: {
    required: true,
    type: String
  },
  money: {
    required: true,
    type: Number
  },
  price: {
    required: true,
    type: Number
  },
  number: {
    required: true,
    type: Number
  },
  customer: {
    type: String
  },
  tell: {
    type: Number
  },
  address: {
    type: String
  },
  projectPerson: {
    required: true,
    type: String
  },
  paymentTime: {
    required: true,
    type: Date
  },
  mark: {
    type: String
  },
  year: {
    type: String
  },
  month: {
    type: String
  },
  companyId: {
    type: String
  },
  day: {
    type: String
  },
  createDate: {
    type: String,
    default: new Date().Format('yyyy-MM-dd hh:mm:ss')
  }
}, {
  versionKey: false,
  timestamps: true
})

const model = {
  Income: mongoose.model('income', income)
}
module.exports = model
