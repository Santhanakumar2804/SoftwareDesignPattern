import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Social Icons */}
        <div className="flex space-x-3 mb-2 md:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
            <i className="fab fa-facebook-f text-white"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon p-2 rounded-full bg-blue-400 hover:bg-blue-500 transition-colors">
            <i className="fab fa-twitter text-white"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon p-2 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors">
            <i className="fab fa-instagram text-white"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon p-2 rounded-full bg-blue-800 hover:bg-blue-900 transition-colors">
            <i className="fab fa-linkedin-in text-white"></i>
          </a>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col items-center text-center space-y-1 mb-2 md:mb-0">
          <p className="text-white text-sm">Phone: (123) 456-7890</p>
          <p className="text-white text-sm">Email: support@lifeinsuranceportal.com</p>
          <p className="text-white text-sm">Address: 1234 Insurance Lane, Suite 100, City, State, 12345</p>
        </div>
        
        {/* Copyright */}
        <p className="text-center text-white text-sm">© 2024 Life Insurance Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
