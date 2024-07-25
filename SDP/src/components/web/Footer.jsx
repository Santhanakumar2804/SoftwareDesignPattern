import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-pink-600 p-4">
      <div className="container mx-auto text-center text-white">
        <div className="social-icons mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon mx-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon mx-2">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        © 2024 Life Insurance Portal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
