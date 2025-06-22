import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastMessage from './Toast';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!isValidPhoneNumber(phone)) {
      setMessage('Invalid phone number. Please enter a 10-digit number.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, email, password })
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        login(result.email);
        setShowToast(true);
        navigate('/');
      } else {
        setMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };



  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4 rounded" style={{ width: "100%", maxWidth: "400px", opacity: 0.9 }}>
          <h3 className="mb-4 text-start fw-b">Sign Up</h3> {/* Heading aligned left */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number"
                maxLength="10"
                required
                value={phone}
                onChange={(e => setPhone(e.target.value))}
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} required />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3 form-check text-start">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">By clicking on Login, I accept the Terms & Conditions & Privacy Policy</label>
            </div>
            {message && <div className='text-danger text-center mb-3'>{message}</div>}
            <button type="submit" className="btn btn-primary w-100">Sign-Up</button>
            <ToastMessage message="Signup Successful!" show={showToast} setShow={setShowToast} />
          </form>
        </div>
      </div>
    </div >
  );
};

export default Login;
