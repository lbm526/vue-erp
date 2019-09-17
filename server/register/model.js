const mongoose = require('mongoose')

const Schema = mongoose.Schema

const register = new Schema({
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    password: {
        required: true,
        type: String
    },
    companyId: {
        required: true,
        type: String
    },
    companyName: {
        required: true,
        type: String
    }
})

const modal = {
    Register: mongoose.model('Register', register)
}
module.exports = modal