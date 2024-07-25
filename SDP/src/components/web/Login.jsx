import React from 'react';
import Footer from './Footer'; // Ensure you have the correct path to the Footer component

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-white-500 to-red-600">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Login to Your Account</h2>
          <form action="#" method="POST">
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">Register here</a>
            </p>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
