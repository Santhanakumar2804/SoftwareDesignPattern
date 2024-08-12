import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/web/Navbar'; 
import Footer from './components/web/Footer'; 
import LandingPage from './Pages/Landingpage';
import Login from './components/web/Login';
import Register from './components/web/Register';
import UserLayout from './layout/UserLayout';
import Faq from './components/User/Faq';
import UserDashboard from './components/User/UserDashboard';
import UserGetPolicy from './components/User/UserGetPolicy';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLayout from './layout/AdminLayout';
import AdminUsers from './components/Admin/AdminUsers';
import AdminClaim from './components/Admin/AdminClaim';


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

            <Route element={<UserLayout />}>
                        <Route path='/user/dashboard' element={<UserDashboard />} />
                        <Route path='/user/policy' element={<UserGetPolicy/>} />
                        <Route path='/user/faq' element={<Faq/>} />
                       
            </Route>
            <Route element={<AdminLayout />}>
                        <Route path='/admin/dashboard' element={<AdminDashboard />} />
                        <Route path='/admin/users' element={<AdminUsers/>} />
                        <Route path='/admin/claims' element={<AdminClaim/>} />
                       
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
