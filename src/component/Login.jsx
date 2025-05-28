import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ToastMessage from './Toast';
import LoginBg from '../assets/login-bg.jpg';

const Login = () => {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [showToast, setShowToast] = useState(false);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role: role,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                login(email);
                setShowToast(true);
                navigate('/admin');
            } else {
                setMessage('Invalid USER');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    }


    const hadleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                login(email);
                setShowToast(true);
                navigate('/');
            } else {
                setMessage('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <div style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4 rounded" style={{ width: "100%", maxWidth: "400px", opacity: 0.9 }}>
                    <h3 className="mb-1 text-start fw-b">Login</h3>
                    <Link className='mb-3 nav-link text-start' to='/signup'>or <span className='link-primary'>create an account</span></Link> {/* Heading aligned left */}
                    <form>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="mb-3 form-check text-start">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">By clicking on Login, I accept the Terms & Conditions & Privacy Policy</label>
                        </div>
                        {message && <div className="text-danger text-center mb-3">{message}</div>}
                        <button type="submit" className="btn btn-primary w-100" onClick={hadleSubmit}>Login</button>
                        <button type="submit" className="btn btn-success w-100 mt-2" onClick={handleAdminLogin}>Admin Login</button>

                        <ToastMessage message="Login Successful!" show={showToast} setShow={setShowToast} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
