const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    isdoctor: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'patient'
    },
    notification: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
