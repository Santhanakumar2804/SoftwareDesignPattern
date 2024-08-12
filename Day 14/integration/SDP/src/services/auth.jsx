import { axiosInstance } from "./api";
import { jwtDecode } from "jwt-decode";

const setToken = (token) => localStorage.setItem('token', token);

const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    return null;
}

const getUserEmail = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.sub;
    }
    return null;
}

const getUserRole = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.role;
    }
    return null;
}

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        const isLogin = Date.now() < payload.exp * 1000;
        return isLogin;
    }
    return false;
}

const SignIn = (email, password) => axiosInstance.post("/api/v1/auth/authenticate", { email, password });
const SignOut = () => localStorage.clear();

export const authService = { getToken, setToken, getUserEmail, getUserRole, isLoggedIn, SignIn, SignOut };