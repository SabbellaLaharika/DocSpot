const User = require('../schemas/userModel');
const Doctor = require('../schemas/docModel');

const Appointment = require('../schemas/appointmentModel');

// Stubs for admin controllers
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).populate('userID', 'name email');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDoctorStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ type: 'patient' });
        const totalDoctors = await Doctor.countDocuments({});
        const pendingDoctors = await Doctor.countDocuments({ status: 'pending' });
        const totalAppointments = await Appointment.countDocuments({});

        res.json({
            users: totalUsers,
            doctors: totalDoctors,
            pendingDoctors,
            appointments: totalAppointments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllDoctors, updateDoctorStatus, getAdminStats };
