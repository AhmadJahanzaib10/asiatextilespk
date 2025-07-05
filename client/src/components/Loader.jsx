import React from 'react'

const Loader = ({message}) => {
  return (
    <div className='w-100 vh-100 position-fixed top-0 d-flex justify-content-center align-items-center flex-column'
    style={{background: "#00000042", zIndex: 99999999}}
    >
        <div className='d-flex justify-content-center align-items-center flex-column p-3' style={{background: "#fff", borderRadius: "5px"}}>
        <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
        <h5 className='mt-3' style={{color: "#000"}}>{message}</h5>
        </div>
    </div>
  )
}

export default Loader