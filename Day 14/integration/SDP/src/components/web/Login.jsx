import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import { authService } from "../../services/auth";
// import '../assets/css/Login.css'; 
import { axiosInstance } from "@/services/api";

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [isRotated, setIsRotated] = useState(false);
    const navigate = useNavigate(); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (token) => {
        authService.setToken(token);

        try {
            const role = authService.getUserRole();

            if (role) {
                if (role === 'USER') {
                    navigate('/user/dashboard');
                } else if (role === 'ADMIN') {
                    navigate('/admin/dashboard');
                } else {
                    toast.error('Unknown role.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                }
            } else {
                toast.error('Role not found in token.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            toast.error('Failed to decode token.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            toast.error('Please enter both email and password.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            return;
        }

        try {
            const response = await authService.SignIn(email, password); 

            const { token } = response.data;

            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            setTimeout(() => {
                handleLogin(token);
            }, 2000);
        } catch (error) {
            toast.error('Login failed. Please check your credentials.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const renderForm = () => {
        return (
            <div className={`form-container ${isRotated ? 'rotated' : ''} p-8 rounded-lg border border-gray-300 transition-colors duration-300 bg-white`}>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign In</h2>
                <p className="text-sm text-gray-600 mb-8">Access your account by logging in</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                        <input 
                            className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 transition-all duration-300 text-gray-800 text-base" 
                            type="email" 
                            name="email" 
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-5.2 3.12L15 11.785V5.383zM1 5.383v6.402l5.2-3.282L1 5.383zM1 12.785l5.2-3.12L1 5.383v7.402z"/>
                        </svg>
                    </div>
                    <div className="relative">
                        <input 
                            className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 transition-all duration-300 text-gray-800 text-base" 
                            type={passwordVisible ? "text" : "password"} 
                            name="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            fill="gray" 
                            className="bi bi-eye absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                            viewBox="0 0 16 16" 
                            onClick={togglePasswordVisibility}>
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </div>
                    <button className="w-full py-3 mt-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-base">Login</button>
                </form>
                <div className="mt-6 text-sm flex justify-between items-center text-gray-600">
                    <p>New Account?</p>
                    <button onClick={handleRegisterClick} className="py-2 px-5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-base">Register</button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center bg-gray-200">
                {renderForm()}
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
