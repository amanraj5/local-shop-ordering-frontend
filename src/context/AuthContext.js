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

    // Fetched the token from localStorage
    const token = localStorage.getItem("token");

    // Checking if token is there
    if (token) {
        // Decoding the token by using the method of jwt-decode
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        // Checking the condition if the decoded time from the token is less than the current time then navigate to login and remove the token from local storage
        if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem("token");
            window.location.href = "/login"; 
            // navigate("\login");
        }
    }


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
