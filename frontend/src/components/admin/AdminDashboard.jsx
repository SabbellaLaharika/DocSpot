import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ users: 0, doctors: 0, pendingDoctors: 0, appointments: 0 });
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.type !== 'admin') {
                navigate('/login');
            } else {
                setUser(parsedUser);
                fetchData();
            }
        }
    }, [navigate]);

    const fetchData = async () => {
        try {
            const [statsRes, docRes] = await Promise.all([
                fetch('http://localhost:5000/api/admin/stats'),
                fetch('http://localhost:5000/api/admin/doctors')
            ]);

            if (statsRes.ok && docRes.ok) {
                setStats(await statsRes.json());
                setDoctors(await docRes.json());
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDoctorStatus = async (doctorId, status) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/doctors/status/${doctorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                // Refresh data
                fetchData();
            } else {
                alert('Failed to update doctor status');
            }
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <nav className="bg-white shadow h-16 flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-gray-800">Administrator Console</h2>
                    <button
                        onClick={handleLogout}
                        className="text-sm border border-red-200 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 font-medium transition"
                    >
                        Sign Out
                    </button>
                </nav>

                <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Patients</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.users}</h3>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-emerald-500">
                            <p className="text-sm font-medium text-gray-500 mb-1">Approved Doctors</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.doctors - stats.pendingDoctors}</h3>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500">
                            <p className="text-sm font-medium text-gray-500 mb-1">Pending Approvals</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.pendingDoctors}</h3>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Appointments</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.appointments}</h3>
                        </div>
                    </div>

                    {/* Pending Approvals Section */}
                    <div id="doctor-applications-table" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Doctor Applications</h3>
                        </div>

                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading directory...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {doctors.map((doc) => (
                                            <tr key={doc._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{doc.fullname}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {doc.specialization || 'Unspecified'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{doc.email}</div>
                                                    <div className="text-sm text-gray-500">{doc.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'}`}>
                                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    {doc.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleDoctorStatus(doc._id, 'approved')}
                                                                className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded transition"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleDoctorStatus(doc._id, 'rejected')}
                                                                className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded transition"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
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

export default AdminDashboard;
