import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const [user, setUser] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(storedUser));
            fetchDoctors();
        }
    }, [navigate]);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/doctor/approved');
            const data = await response.json();
            if (response.ok) {
                setDoctors(data);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoadingDoctors(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-blue-600">DocSpot Patient Portal</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm bg-red-50 text-red-600 px-3 py-2 rounded-md hover:bg-red-100 font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Dashboard</h2>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                        <div
                            onClick={() => {
                                const el = document.getElementById('doctors-list');
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth' });
                                    el.classList.add('ring-4', 'ring-blue-500', 'transition-all', 'duration-500');
                                    setTimeout(() => {
                                        el.classList.remove('ring-4', 'ring-blue-500');
                                    }, 1500);
                                }
                            }}
                            className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-blue-500 cursor-pointer hover:shadow-md transition"
                        >
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dt className="text-lg font-medium text-gray-900 truncate">Book Appointment</dt>
                                        <dd className="text-sm text-gray-500">Find a doctor and schedule</dd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/user/appointments')}
                            className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-green-500 cursor-pointer hover:shadow-md transition"
                        >
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dt className="text-lg font-medium text-gray-900 truncate">My Appointments</dt>
                                        <dd className="text-sm text-gray-500">View upcoming and past visits</dd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/user/notifications')}
                            className="bg-white overflow-hidden shadow rounded-lg border-t-4 border-purple-500 cursor-pointer hover:shadow-md transition"
                        >
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dt className="text-lg font-medium text-gray-900 truncate">Notifications</dt>
                                        <dd className="text-sm text-gray-500">Check appointment statuses</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doctors List */}
                    <div id="doctors-list" className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Available Doctors</h3>
                        </div>
                        <div className="p-6">
                            {loadingDoctors ? (
                                <div className="text-center text-gray-500 py-12">Loading doctors...</div>
                            ) : doctors.length === 0 ? (
                                <div className="text-center text-gray-500 py-12">No doctors currently available.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {doctors.map(doctor => (
                                        <div key={doctor._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                                            <div className="flex items-center mb-4">
                                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                                    {doctor.fullname.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="text-lg font-bold text-gray-900">{doctor.fullname}</h4>
                                                    <p className="text-sm text-gray-500">{doctor.specialization}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-600 mb-6">
                                                <p><span className="font-medium text-gray-700">Experience:</span> {doctor.experience || 'Not specified'}</p>
                                                <p><span className="font-medium text-gray-700">Fees:</span> ${doctor.fees || 'TBD'}</p>
                                            </div>
                                            <button
                                                onClick={() => navigate(`/book/${doctor._id}`)}
                                                className="w-full bg-blue-50 text-blue-600 font-medium py-2 rounded-md hover:bg-blue-100 transition"
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserHome;
