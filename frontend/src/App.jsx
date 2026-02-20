import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Common
import Home from './components/common/Home';
import Login from './components/common/Login';
import Register from './components/common/Register';

// Admin
import AdminDashboard from './components/admin/AdminDashboard';

// User
import UserHome from './components/user/UserHome';
import BookAppointment from './components/user/BookAppointment';
import UserAppointments from './components/user/UserAppointments';
import UserNotifications from './components/user/UserNotifications';

// Doctor
import DoctorDashboard from './components/doctor/DoctorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/user/appointments" element={<UserAppointments />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        <Route path="/book/:doctorId" element={<BookAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;