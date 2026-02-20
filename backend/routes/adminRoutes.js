const express = require('express');
const router = express.Router();
const { getAllDoctors, updateDoctorStatus, getAdminStats } = require('../controllers/adminC');

// Example protected route for admin
router.get('/doctors', getAllDoctors);
router.put('/doctors/status/:id', updateDoctorStatus);
router.get('/stats', getAdminStats);

module.exports = router;
