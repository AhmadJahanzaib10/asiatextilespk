import React from 'react'
import Logo from "../assets/images/LOGO-ASIA-TEXTILES.jpg"
const Footer = () => {
  return (
    <div className='w-100' style={{background: "rgb(1, 146, 62)"}}>
        <div className='container py-3'>
        <div className="d-flex justify-content-between align-items-center">
            <img src={Logo}
                style={{
                    width: "50px",
                }}
            alt="" />
            <p className='text-white secondary-font mb-0'>© {new Date().getFullYear()}  ALL RIGHTS RESERVED.</p>
        </div>
    </div>
    </div>
  )
}

export default Footer