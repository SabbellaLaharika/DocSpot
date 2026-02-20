const Appointment = require('../schemas/appointmentModel');

// Book a new appointment
const createAppointment = async (req, res) => {
    try {
        const { userInfo, doctorInfo, date } = req.body;

        let documentPath = null;
        if (req.file) {
            documentPath = req.file.path; // Multer saves the file path
        }

        const newAppointment = await Appointment.create({
            userInfo,
            doctorInfo,
            date,
            document: documentPath,
            status: 'pending'
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all appointments for a specific user (Patient)
const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userInfo: req.params.userId })
            .populate('doctorInfo', 'fullname specialization')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all appointments for a specific doctor
const getDoctorAppointments = async (req, res) => {
    try {
        const Doctor = require('../schemas/docModel');
        const doctorProfile = await Doctor.findOne({ userID: req.params.doctorId });

        if (!doctorProfile) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        const appointments = await Appointment.find({ doctorInfo: doctorProfile._id })
            .populate('userInfo', 'name email phone')
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update appointment status (confirm, cancel, complete)
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAppointment,
    getUserAppointments,
    getDoctorAppointments,
    updateAppointmentStatus
};
