import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        navigate('/');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <nav className={`navbar navbar-expand-lg shadow-sm sticky-top ${darkMode ? "navbar-dark bg-dark text-white" : ""}`} style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
            <div className="container py-2">
                <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
                    𝒩𝑒𝒶𝓇𝐵𝓊𝓎
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left Links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold text-dark hover-link" to="/myorders">My Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold text-dark hover-link" to="/about">About Us</Link>
                        </li>

                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link text-dark hover-link" to="/login">Sign-In</Link>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger btn-sm mt-1 ms-2" onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                    <div className='d-flex align-items-center gap-3'>
                        <Link to="/cart" className="position-relative">
                            <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png" alt="Cart" style={{ width: "30px" }} />
                            {cartItems.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        {/* Right Side - Search + Cart */}
                        <form className="d-flex align-items-center gap-2" role="search" onSubmit={(e) => e.preventDefault()}>
                            <input className="form-control rounded-pill px-3" type="search" placeholder="Search" style={{ maxWidth: "200px" }} />
                            <button className="btn btn-outline-primary rounded-pill px-3" type="submit">Search</button>

                        </form>
                        <button className="btn btn-outline-dark" onClick={toggleDarkMode}>
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
