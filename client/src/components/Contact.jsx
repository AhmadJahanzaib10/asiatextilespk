import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    contactNumber: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div 
      className="contact-section mt-5 py-5"
      style={{
        background: '#01923E',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Dark overlay */}
      {/* <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1
        }}
      /> */}
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Green header bar */}
        <div 
          className="text-center py-3 primary-font mb-5"
          style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            letterSpacing: '2px',
            marginTop: '-20px'
          }}
        >
          CONTACT US
        </div>

        <div className="row">
          {/* Left Side - Address Information */}
          <div className="col-md-6 text-white">
            <h2 className="mb-4 secondary-font" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Address
            </h2>

            {/* Address Section */}
            <div className="mb-4 d-flex align-items-start">
              <div 
                className="me-3 mt-1"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#111',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="fas fa-map-marker-alt" style={{ color: 'white', fontSize: '18px' }}></i>
              </div>
              <div>
                <p className="mb-1 secondary-font fw-bolder" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                  Asiatex Corporation
                </p>
                <p className="mb-1 secondary-font">
                  Hanif Street Opp. NLC Bypass<br />
                  Jahangir Abad Raja Pur, Khanewal<br />
                  Road, Multan 60000. Pakistan
                </p>
                <button 
                  className="btn btn-info primary-font btn-sm mt-2"
                  style={{ 
                    backgroundColor: '#111',
                    border: 'none',
                    color: "#fff",
                    padding: '5px 15px'
                  }}
                >
                  View on map
                </button>
              </div>
            </div>

            {/* Phone Section */}
            <div className="mb-4 d-flex align-items-start">
              <div 
                className="me-3 mt-1"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#111',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="fas fa-phone" style={{ color: 'white', fontSize: '18px' }}></i>
              </div>
              <div>
                <p className="mb-1 secondary-font">
                  <strong>Corporate office:</strong> +92 61 6353111
                </p>
                <p className="mb-1 secondary-font">
                  <strong>Mill:</strong> +92 61 4556662
                </p>
                <p className="mb-1 secondary-font">
                  <strong>Skype:</strong> asiatexcorp & yousafasiatex
                </p>
              </div>
            </div>

            {/* Email Section */}
            <div className="mb-4 d-flex align-items-center">
              <div 
                className="me-3 mt-1"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#111',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="fas fa-envelope" style={{ color: 'white', fontSize: '18px' }}></i>
              </div>
              <div>
                <p className="mb-1 secondary-font">
                  <strong>Email:</strong> 
                  <a href="mailto:sales@asiatexcorp.com" className="text-info ms-2">
                    sales@asiatexcorp.com
                  </a>
                </p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="d-flex mt-4">
              <div 
                className="me-3"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#3b5998',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <i className="fab fa-facebook-f" style={{ color: 'white', fontSize: '20px' }}></i>
              </div>
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#dd4b39',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <i className="fab fa-google-plus-g" style={{ color: 'white', fontSize: '20px' }}></i>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="col-md-6">
            <h2 className="mb-4 text-white primary-font" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              Feel free to write us
            </h2>

            <div onSubmit={handleSubmit}>
              <div className="row gap--3 mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control secondary-font"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      padding: '12px 15px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control secondary-font"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      padding: '12px 15px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div className="row gap--3 mb-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="company"
                    className="form-control secondary-font"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      padding: '12px 15px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="contactNumber"
                    className="form-control secondary-font"
                    placeholder="Your Contact Number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      padding: '12px 15px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control secondary-font"
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    padding: '12px 15px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="button"
                className="btn primary-font btn-success btn-lg px-4 py-2"
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#111',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Font Awesome CDN for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  );
};

export default Contact;