import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                if (data.type === 'admin') navigate('/admin');
                else if (data.type === 'doctor') navigate('/doctor');
                else navigate('/user');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to connect to backend server');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Demo Credentials</h3>
                        <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-100">
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Admin:</span>
                                <code>admin@docspot.com / adminpassword</code>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Doctor:</span>
                                <code>doctor@docspot.com / doctorpassword</code>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Patient:</span>
                                <code>patient@docspot.com / patientpassword</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
