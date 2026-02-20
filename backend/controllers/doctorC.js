const Doctor = require('../schemas/docModel');
const Appointment = require('../schemas/appointmentModel');

// Stubs for doctor controllers
const getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorInfo: req.user._id }).populate('userInfo', 'name email');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getApprovedDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: 'approved' });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDoctorAppointments, getApprovedDoctors };
