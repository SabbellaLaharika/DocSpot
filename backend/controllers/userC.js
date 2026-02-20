const User = require('../schemas/userModel');
const Doctor = require('../schemas/docModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Helper
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_secret_key', {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, type, phone, isdoctor, specialization } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            type,
            phone,
            isdoctor: isdoctor || false
        });

        // If user is a doctor, create a Doctor profile
        if (type === 'doctor') {
            await Doctor.create({
                userID: user._id,
                fullname: name,
                email: email,
                phone: phone,
                specialization: specialization || 'General',
                status: 'pending' // Admin needs to approve
            });
        }

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Handle plain-text seeded passwords from our demo script OR bcrypt passwords
        let isMatch = false;
        if (user) {
            if (password === user.password) {
                isMatch = true; // Matched plain-text seed
            } else {
                isMatch = await bcrypt.compare(password, user.password);
            }
        }

        let doctorStatus = null;
        if (user && user.type === 'doctor') {
            const doc = await Doctor.findOne({ userID: user._id });
            if (doc) doctorStatus = doc.status;
        }

        if (user && isMatch) {
            if (user.type === 'doctor' && doctorStatus !== 'approved') {
                return res.status(403).json({ message: `Your doctor account is currently ${doctorStatus || 'pending'}. Please wait for admin approval.` });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = { registerUser, loginUser };
