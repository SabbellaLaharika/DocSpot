import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-2xl font-bold text-blue-600">DocSpot</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Seamless Appointment</span>{' '}
                                    <span className="block text-blue-600 xl:inline">Booking for Health</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Booking a doctor's appointment has never been easier. With our convenient online platform, you can quickly and effortlessly schedule your appointments from the comfort of your own home. No more waiting on hold or playing phone tag with busy receptionists.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

            {/* Features layout */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mt-10">
                        <div className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-10 text-center">
                            <div className="flex-1 p-6 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                                <h3 className="text-xl font-medium text-gray-900">Find the Perfect Match</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    Browse through a wide range of doctors and healthcare providers filtered by specialty and location.
                                </p>
                            </div>
                            <div className="flex-1 p-6 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                                <h3 className="text-xl font-medium text-gray-900">Real-time Availability</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    Choose from a range of open slots that fit your schedule, including early morning and weekends.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
