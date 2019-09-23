const mongoose = require('mongoose')

const Scheam = mongoose.Schema

const payModal = new Scheam({
  name: {
    required: true,
    type: String
  },
  money: {
    required: true,
    type: Number
  },
  payPerson: {
    required: true,
    type: String
  },
  mark: {
    type: String
  },
  reason: {
    type: String
  },
  year: {
    type: String
  },
  companyId: {
    type: String
  },
  month: {
    type: String
  },
  day: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})

const modal = {
  PayModal: mongoose.model('payModal', payModal)
}

module.exports = modal
