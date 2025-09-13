const mongoose = require('mongoose');
const validator = require('validator');
const roles = require('../utils/userRoles');
const User = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please fill a valid email address format'],
    },
    password : {
        type: String,
        required: true
    },
    token : {
        type: String
    },
    role: {
        type: String,
        enum: [roles.ADMIN, roles.USER, roles.MANAGER],
        default: roles.USER
    },
    avatar: {
        type: String,
        default: 'uploads/default.jpg'
    }
})

module.exports = mongoose.model('User', User);