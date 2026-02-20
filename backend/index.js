const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectToDB');
const path = require('path');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Root Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
