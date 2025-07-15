// src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/sidebar.css';
import { jwtDecode } from "jwt-decode";


const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  const handleLogout = () => {
    // Clear any authentication tokens/data
    localStorage.removeItem('token');
    sessionStorage.clear();
    
    // Redirect to home page
    navigate('/');
    
    // Close sidebar on mobile
    if (onClose) onClose();
  };

  useEffect(()=>{
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      // { id: '...', username: '...', role: '...', iat: ..., exp: ... }
    }
  })

  return (
    <div className={`sidebar bg-gradient text-white ${isOpen ? 'show' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-speedometer2 fs-4"></i>
            <h5 className="mb-0 fw-bold">Admin Panel</h5>
          </div>
          <button className="btn btn-sm btn-outline-light d-md-none" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/admin/add" className={({ isActive }) =>
              `nav-link sidebar-link ${isActive ? 'active' : ''}`
            }>
              <i className="bi bi-plus-circle"></i>
              <span>Add Product</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/delete" className={({ isActive }) =>
              `nav-link sidebar-link ${isActive ? 'active' : ''}`
            }>
              <i className="bi bi-trash3"></i>
              <span>Delete Product</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/modify" className={({ isActive }) =>
              `nav-link sidebar-link ${isActive ? 'active' : ''}`
            }>
              <i className="bi bi-pencil-square"></i>
              <span>Modify Product</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer with logout */}
      <div className="sidebar-footer">
        <hr className="sidebar-divider" />
        <div className="user-info mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className="user-avatar">
              <i className="bi bi-person-circle fs-3"></i>
            </div>
            <div>
              <div className="fw-semibold">{user.username}</div>
              <small className="text-light opacity-75">{user.role}</small>
            </div>
          </div>
        </div>
        <button 
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
