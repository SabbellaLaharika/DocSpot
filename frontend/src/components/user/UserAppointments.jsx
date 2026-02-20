import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAppointments = () => {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchAppointments(parsedUser._id);
        }
    }, [navigate]);

    const fetchAppointments = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/user/${userId}`);
            const data = await response.json();
            if (response.ok) {
                setAppointments(data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/appointments/status/${appointmentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'cancelled' })
            });
            if (response.ok) {
                // Refresh list locally
                setAppointments(prev => prev.map(app => app._id === appointmentId ? { ...app, status: 'cancelled' } : app));
            } else {
                alert('Failed to cancel appointment');
            }
        } catch (error) {
            console.error('Error cancelling:', error);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/user')}>DocSpot</h1>
                            <span className="ml-4 text-gray-400">/</span>
                            <span className="ml-4 text-gray-800 font-medium">My Appointments</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={() => navigate('/user')} className="text-sm text-gray-600 hover:text-gray-900 font-medium">Back to Dashboard</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Loading your history...</div>
                    ) : appointments.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <p className="mb-4">You have no booking history.</p>
                            <button onClick={() => navigate('/user')} className="text-blue-600 font-medium hover:underline">Book an Appointment</button>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                                <li key={appointment._id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-medium text-blue-600 truncate">
                                                {appointment.doctorInfo?.fullname || 'Unknown Doctor'}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${appointment.status === 'scheduled' || appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    Specialization: {appointment.doctorInfo?.specialization || 'General'}
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    Date: {new Date(appointment.date).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm sm:mt-0">
                                                {(appointment.status === 'pending' || appointment.status === 'scheduled') && (
                                                    <button
                                                        onClick={() => handleCancel(appointment._id)}
                                                        className="text-red-600 hover:text-red-900 font-medium"
                                                    >
                                                        Cancel Appointment
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UserAppointments;
