const express = require('express');
const router = express.Router();
const { getDoctorAppointments, getApprovedDoctors } = require('../controllers/doctorC');

// Example protected route for doctor
router.get('/appointments', getDoctorAppointments);

// Public/User route to fetch approved doctors
router.get('/approved', getApprovedDoctors);

module.exports = router;
