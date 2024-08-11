import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-heartbeat text-white text-2xl"></i>
          <Link to="/" className="text-white text-lg font-semibold">Life Insurance Company</Link>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-white hover:underline">Login</Link>
          <Link to="/register" className="text-white hover:underline">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
