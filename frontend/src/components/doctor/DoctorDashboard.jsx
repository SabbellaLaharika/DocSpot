import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
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
            if (parsedUser.type !== 'doctor') {
                navigate('/login');
            } else {
                setUser(parsedUser);
                fetchAppointments(parsedUser._id);
            }
        }
    }, [navigate]);

    const fetchAppointments = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
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

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/status/${appointmentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                // Refresh list locally
                setAppointments(prev => prev.map(app => app._id === appointmentId ? { ...app, status: newStatus } : app));
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <nav className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-gray-800">Doctor Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600">{user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm bg-red-50 text-red-600 px-3 py-2 rounded-md hover:bg-red-100 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </nav>

                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Stats Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h3>
                            <p className="text-gray-500 mt-1">Manage your schedule and view upcoming patient appointments.</p>
                        </div>
                        <div className="text-right">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Approved Provider
                            </span>
                        </div>
                    </div>

                    {/* Pending Approvals Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                        </div>

                        {loading ? (
                            <div className="p-6 text-center text-gray-500 py-12">Loading appointments...</div>
                        ) : appointments.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 py-12">You have no upcoming appointments.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {appointments.map((appointment) => (
                                            <tr key={appointment._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{appointment.userInfo?.name || 'Unknown Patient'}</div>
                                                    <div className="text-sm text-gray-500">{appointment.userInfo?.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{new Date(appointment.date).toLocaleDateString()}</div>
                                                    <div className="text-sm text-gray-500">{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${appointment.status === 'scheduled' || appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            appointment.status === 'cancelled' || appointment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'}`}>
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {appointment.document ? (
                                                        <a href={`http://localhost:5000/${appointment.document.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                            View File
                                                        </a>
                                                    ) : 'No Doc'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    {appointment.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusUpdate(appointment._id, 'scheduled')}
                                                                className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(appointment._id, 'rejected')}
                                                                className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                    {appointment.status === 'scheduled' && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(appointment._id, 'completed')}
                                                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded"
                                                        >
                                                            Mark Complete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorDashboard;
