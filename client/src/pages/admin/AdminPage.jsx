// src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({baseURL}) => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check for token on first load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token is still valid by checking expiry
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (tokenData.exp > currentTime) {
          navigate('/admin/add');
        } else {
          // Token expired, remove it
          localStorage.removeItem('token');
          setAuthChecked(true);
        }
      } catch (error) {
        // Invalid token, remove it
        localStorage.removeItem('token');
        setAuthChecked(true);
      }
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`${baseURL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        setIsLoading(false)
        navigate('/admin/add');
      } else {
        setError(data.message || 'Login failed');
        setIsLoading(false)
      }
    } catch (err) {
      setIsLoading(false)
      setError('Server error. Try again later.');
    }
  };

  if (!authChecked) return <p className="text-center mt-5">Checking auth...</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center fit-screen">
      {isLoading && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75"
          style={{ zIndex: 9999 }}
        >
          <div className="text-center text-white">
            <div className="spinner-border text-light mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-white mb-2">Logging you in...</h5>
            <p className="text-light mb-0">Please wait</p>
          </div>
        </div>
      )}
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn button-green w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
