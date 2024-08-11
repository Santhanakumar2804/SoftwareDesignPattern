import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard'; // Adjust the path as necessary
import UserDashboard from './UserDashboard'; // Adjust the path as necessary
import axios from 'axios'; // Import axios for making HTTP requests

function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !password) {
      setAlert('Please enter both Email Address and password.');
      return;
    } 
    if (!emailPattern.test(username)) {
      setAlert('Please enter a valid email address (e.g., example@gmail.com).');
      return;
    } 
    if (!username.endsWith('@gmail.com')) {
      setAlert('Please use a Gmail address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/customers/login', { // Replace with your backend URL
        email: username,
        password: password,
      });

      if (response.status === 200) {
        // If login is successful, set loggedIn to true
        setAlert('');
        setLoggedIn(true);
      } else {
        // If login fails, show an error message
        setAlert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle login error
      setAlert('Login failed. Please check your credentials.');
    }
  };

  if (loggedIn) {
    return isAdmin ? <AdminDashboard /> : <UserDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-200 via-blue-300 to-white-400 bg-opacity-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          {isAdmin ? 'Admin Login' : 'User Login'}
        </h2>
        {alert && (
          <div className="mb-6 text-red-500 text-center">
            {alert}
          </div>
        )}
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Email Address
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-blue-600 hover:text-blue-700 focus:outline-none"
          >
            {isAdmin ? 'Switch to User Login' : 'Switch to Admin Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
