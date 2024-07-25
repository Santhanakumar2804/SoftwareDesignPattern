import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function LandingPage() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center text-white text-center p-5">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg">
        <h2 className="text-5xl font-extrabold mb-4">Welcome to the Life Insurance Portal</h2>
        <p className="text-xl mb-8">Secure your future with our reliable insurance plans.</p>
        
        <div className="flex flex-wrap justify-center mb-12">
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-lg m-4 max-w-xs transition transform hover:scale-105">
            <i className="fas fa-shield-alt text-4xl text-indigo-700 mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Comprehensive Coverage</h2>
            <p className="text-base text-gray-800">Protect your family with our all-inclusive insurance plans.</p>
          </div>
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-lg m-4 max-w-xs transition transform hover:scale-105">
            <i className="fas fa-dollar-sign text-4xl text-green-700 mb-4"></i> c
            <h2 className="text-2xl font-bold mb-2">Affordable Rates</h2>
            <p className="text-base text-gray-800">Get the best coverage at the most competitive prices.</p>
          </div>
          <div className="p-6 bg-white bg-opacity-80 rounded-lg shadow-lg m-4 max-w-xs transition transform hover:scale-105">
            <i className="fas fa-user-friends text-4xl text-blue-700 mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">Excellent Support</h2>
            <p className="text-base text-gray-800">Our customer service team is here to help you 24/7.</p>
          </div>
        </div>

        <button className="bg-pink-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-pink-700 transition duration-300 text-lg font-semibold">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;