const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    specialization: {
        type: String,
        required: true
    },
    timings: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    experience: {
        type: String
    },
    fees: {
        type: Number
    }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', docSchema);
module.exports = Doctor;
