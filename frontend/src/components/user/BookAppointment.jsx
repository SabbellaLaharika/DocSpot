import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [date, setDate] = useState('');
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('userInfo', user._id);
        formData.append('doctorInfo', doctorId);
        formData.append('date', date);
        if (document) {
            formData.append('document', document);
        }

        try {
            const response = await fetch('http://localhost:5000/api/appointments/book', {
                method: 'POST',
                body: formData, // Do not set Content-Type, browser sets it automatically with boundary for FormData
            });

            if (response.ok) {
                alert('Appointment booked successfully! Waiting for doctor confirmation.');
                navigate('/user');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to book appointment');
            }
        } catch (error) {
            console.error('Error booking:', error);
            alert('Failed to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                        <button onClick={() => navigate('/user')} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Select Date & Time</label>
                            <input
                                type="datetime-local"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Medical Document <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setDocument(e.target.files[0])} />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                                </div>
                            </div>
                            {document && <p className="mt-2 text-sm text-green-600 flex items-center">✓ {document.name} selected</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`}
                        >
                            {loading ? 'Submitting...' : 'Confirm Booking'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
