import React from 'react'
import Sidebar from '../../components/Sidebar';

const AddProduct = () => {
  return (
    <div className="d-flex">
    <Sidebar />
    <div className="p-4" style={{ flex: 1 }}>
      Modify
    </div>
  </div>
  )
}

export default AddProduct