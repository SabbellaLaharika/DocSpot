import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserNotifications = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-purple-600 cursor-pointer" onClick={() => navigate('/user')}>
                                DocSpot <span className="text-gray-400 font-normal">/ Notifications</span>
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => navigate('/user')} className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-3xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-6">
                        <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all caught up!</h2>
                    <p className="text-gray-500 mb-6">You have no new notifications at this time. Check back later for updates on your appointment statuses.</p>
                    <button
                        onClick={() => navigate('/user/appointments')}
                        className="bg-purple-50 text-purple-700 px-6 py-2 rounded-md font-medium hover:bg-purple-100 transition"
                    >
                        View My Appointments
                    </button>
                </div>
            </main>
        </div>
    );
};

export default UserNotifications;
