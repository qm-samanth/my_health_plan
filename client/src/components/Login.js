import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Call parent function to update app state
      onLogin(response.data.user, response.data.token);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        {/* Left Login Form Column */}
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center login-form-column bg-white">
          <div className="login-form-wrapper p-4 p-md-5">
            <div className="text-center mb-4">
              {/* Small logo above Login title */}
              <i className="bi bi-heart-pulse text-primary mb-2" style={{ fontSize: '2rem' }}></i>
              <h2 className="fw-bold login-title">My Health Plan</h2>
              <p className="text-muted login-subtitle">Log in to your account.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label login-label">Email</label>
                <input
                  type="email"
                  className="form-control login-input"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label login-label">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control login-input"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <span 
                    onClick={() => setShowPassword(!showPassword)} 
                    className={`password-toggle-icon bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                  ></span>
                </div>
              </div>

              <div className="text-end mb-3">
                <a href="#" className="login-link">Forgot Password?</a>
              </div>
              
              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary w-100 login-btn-main mb-3"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : null}
                {loading ? 'Logging in...' : 'Log In'}
              </button>

              <button 
                type="button" 
                className="btn btn-outline-secondary w-100 login-btn-google d-flex align-items-center justify-content-center"
              >
                <svg className="me-2" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.6404 9.18219C17.6404 8.54589 17.5823 7.93671 17.4776 7.35474H9V10.8458H13.8438C13.6363 11.9702 13.0009 12.9233 12.0478 13.5613V15.8198H14.9562C16.6582 14.2527 17.6404 11.9455 17.6404 9.18219Z" fill="#4285F4"/><path d="M9 18C11.43 18 13.4672 17.1941 14.9562 15.8198L12.0478 13.5613C11.2418 14.1013 10.2112 14.4202 9 14.4202C6.65591 14.4202 4.67182 12.8371 3.96409 10.71H0.955566V13.0418C2.43727 15.9832 5.48182 18 9 18Z" fill="#34A853"/><path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29H0.955566C0.346364 8.36318 0 9.65091 0 11.0218C0 12.3932 0.346364 13.6809 0.955566 14.7541L3.96409 10.71Z" fill="#FBBC05"/><path d="M9 3.57977C10.3214 3.57977 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4672 0.891818 11.43 0 9 0C5.48182 0 2.43727 2.01682 0.955566 4.95818L3.96409 7.29C4.67182 5.16295 6.65591 3.57977 9 3.57977Z" fill="#EA4335"/></svg>
                Log in with Google
              </button>
            </form>
            
            <div className="mt-4 text-center login-signup-link">
              <p className="mb-0">Don't have an account? <a href="#" className="login-link fw-semibold">Sign Up</a></p>
            </div>

            <div className="mt-3 text-center" style={{opacity: 0.7}}>
              <small className="text-muted">
                Demo: maria.hartsell@myhealthplan.com / password123
              </small>
            </div>

          </div>
        </div>

        {/* Right Branding Column */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center login-branding-column">
          <div className="login-logo-icon mb-1" style={{ opacity: '0.6' }}>
            <i className="bi bi-heart-pulse" style={{ fontSize: '12rem' }}></i>
          </div>
          <div className="text-center px-4" style={{ opacity: '0.5' }}>
            <p className="login-tagline" style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: '1.7', opacity: '0.95' }}>
              Empowering Healthcare, One Click at a Time<br />
              <span style={{ fontSize: '1.1rem', opacity: '0.85' }}>Your Health, Your Records, Your Control</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
