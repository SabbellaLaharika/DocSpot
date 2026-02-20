const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    document: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
