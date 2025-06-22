// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
    // const navigate = useNavigate();

    const login = (email) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email); 
        setIsLoggedIn(true);
        setUserEmail(email);
    };



    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("isLoggedIn");
                    window.location.href = "/login";
                }
            } catch (err) {
                console.error("Invalid token:", err);
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }

        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);



    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail('');
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
