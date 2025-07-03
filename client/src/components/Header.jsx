import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../assets/images/logo.jpg';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    const token = Cookies.get('admin_token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    Cookies.remove('admin_token');
    navigate('/admin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img src={logo} alt="Logo" height="30" className="me-2" />
        Asia Textiles
      </a>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsNavCollapsed(!isNavCollapsed)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" href="#">Home</a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Products
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Garments</a></li>
              <li><a className="dropdown-item" href="#">Home Items</a></li>
            </ul>
          </li>

          <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Facilities</a></li>
          <li className="nav-item"><a className="nav-link" href="#">CSR</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Certifications</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contact Us</a></li>

          {isLoggedIn && (
            <li className="nav-item">
              <button className="btn button-green ms-2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
