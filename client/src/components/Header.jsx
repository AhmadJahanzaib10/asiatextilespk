import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/LOGO-ASIA-TEXTILES.jpg'


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const navbarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (dropdownId) => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    } else {
      setActiveDropdown(dropdownId);
      setActiveSubDropdown(null);
    }
  };

  const handleSubDropdownToggle = (subDropdownId) => {
    if (activeSubDropdown === subDropdownId) {
      setActiveSubDropdown(null);
    } else {
      setActiveSubDropdown(subDropdownId);
    }
  };

  return (
    <>
      <StyledNavbar ref={navbarRef} className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand d-flex gap-2 align-items-center" href="#">
            <img src={Logo} alt="" />
            <span className='primary-font fw-bolder'>Asia Textiles</span>
          </a>

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation menu */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Regular menu items */}
              <li className="nav-item">
                <a className="nav-link primary-font" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link primary-font" href="#">About Us</a>
              </li>
              
              {/* Dropdown with sub-dropdowns */}
              <li className={`nav-item dropdown ${activeDropdown === 'services' ? 'show' : ''}`}>
                <a
                  className="nav-link primary-font dropdown-toggle"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownToggle('services');
                  }}
                  aria-expanded={activeDropdown === 'services'}
                >
                  Products
                </a>
                <ul className={`dropdown-menu ${activeDropdown === 'services' ? 'show' : ''}`}>
                  {/* First sub-dropdown */}
                  <li className={`dropdown-submenu ${activeSubDropdown === 'web-services' ? 'show' : ''}`}>
                    <a
                      className="dropdown-item primary-font dropdown-toggle"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubDropdownToggle('web-services');
                      }}
                    >
                      Home Textile
                    </a>
                    <ul className={`dropdown-menu ${activeSubDropdown === 'web-services' ? 'show' : ''}`}>
                      <li><a className="dropdown-item primary-font" href="#">Web Design</a></li>
                      <li><a className="dropdown-item primary-font" href="#">Web Development</a></li>
                      <li><a className="dropdown-item primary-font" href="#">E-commerce</a></li>
                    </ul>
                  </li>
                  
                  {/* Second sub-dropdown */}
                  <li className={`dropdown-submenu ${activeSubDropdown === 'digital-marketing' ? 'show' : ''}`}>
                    <a
                      className="dropdown-item primary-font dropdown-toggle"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubDropdownToggle('digital-marketing');
                      }}
                    >
                      Ready Made
                    </a>
                    <ul className={`dropdown-menu ${activeSubDropdown === 'digital-marketing' ? 'show' : ''}`}>
                      <li><a className="dropdown-item primary-font" href="#">SEO</a></li>
                      <li><a className="dropdown-item primary-font" href="#">Social Media</a></li>
                      <li><a className="dropdown-item primary-font" href="#">PPC Advertising</a></li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Regular menu items */}
              <li className="nav-item">
                <a className="nav-link primary-font" href="#">Facilities</a>
              </li>
              <li className="nav-item">
                <a className="nav-link primary-font" href="#">Certifications</a>
              </li>
              <li className="nav-item">
                <a className="nav-link primary-font" href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </StyledNavbar>
    </>
  );
};

// Styled components for custom styling
const StyledNavbar = styled.nav`
  .navbar-brand img {
    width: 50px;
  }
  
  .navbar-nav .nav-link {
    font-weight: 500;
    margin: 0 0.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--bg-color-1) !important;
    }
  }
  
  .dropdown-menu {
    border: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
  }
  
  .dropdown-item {
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #f8f9fa;
      color: var(--bg-color-1);
    }
  }
  
  .dropdown-submenu {
    position: relative;
  }
  
  .dropdown-submenu .dropdown-menu {
    top: 0;
    left: 100%;
    margin-top: -1px;
    margin-left: -1px;
  }
  
  @media (max-width: 991.98px) {
    .dropdown-submenu .dropdown-menu {
      position: static;
      float: none;
      width: auto;
      margin-top: 0;
      background-color: #f8f9fa;
      border: 0;
      box-shadow: none;
      border-radius: 0;
    }
    
    .dropdown-submenu .dropdown-item {
      padding-left: 2rem;
    }
  }
`;

export default Header;