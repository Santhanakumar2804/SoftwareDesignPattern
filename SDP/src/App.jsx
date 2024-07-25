import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/web/Navbar'; 
import Footer from './components/web/Footer'; 
 import LandingPage from './Pages/Landingpage';
import Login from './components/web/Login'; // Ensure file name is Login.jsx
import Register from './components/web/Register'; // Ensure file name is Register.jsx

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
