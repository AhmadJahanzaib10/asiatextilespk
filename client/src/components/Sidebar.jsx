// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar bg-dark text-white p-3 ${isOpen ? 'show' : ''}`}>
      {/* Close button for mobile */}
      <div className="d-flex justify-content-between align-items-center d-md-none mb-3">
        <h5 className="mb-0">Menu</h5>
        <button className="btn btn-sm btn-outline-light" onClick={onClose}>
        <i class="bi bi-x"></i>
        </button>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink to="/admin/add" className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 ${isActive ? 'active bg-color-1 text-white rounded' : 'text-white'}`
          }>
            <i className="bi bi-plus-circle"></i>
            Add Product
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/delete" className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 ${isActive ? 'active bg-color-1 text-white rounded' : 'text-white'}`
          }>
            <i className="bi bi-trash3"></i>
            Delete Product
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/admin/modify" className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 ${isActive ? 'active bg-color-1 text-white rounded' : 'text-white'}`
          }>
            <i className="bi bi-pencil-square"></i>
            Modify Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
