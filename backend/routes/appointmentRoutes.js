const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createAppointment, getUserAppointments, getDoctorAppointments, updateAppointmentStatus } = require('../controllers/appointmentC');

// Setup Multer for document uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Appointment Routes
router.post('/book', upload.single('document'), createAppointment);
router.get('/user/:userId', getUserAppointments);
router.get('/doctor/:doctorId', getDoctorAppointments);
router.put('/status/:id', updateAppointmentStatus);

module.exports = router;
