import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const AddProduct = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainImg, setMainImg] = useState(null);
  const [sideImages, setSideImages] = useState([]);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);

    // Validation
    if (!title.trim()) {
      setStatus('❌ Product title is required.');
      setIsLoading(false);
      return;
    }
    if (!description.trim()) {
      setStatus('❌ Product description is required.');
      setIsLoading(false);
      return;
    }
    if (!mainImg) {
      setStatus('❌ Main image is required.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('mainImg', mainImg);
    
    // Add side images if any
    if (sideImages && sideImages.length > 0) {
      for (let i = 0; i < sideImages.length; i++) {
        formData.append('sideImages', sideImages[i]);
      }
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus('❌ Please login first.');
        setIsLoading(false);
        return;
      }

      const res = await fetch('http://localhost:5000/api/products/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus('✅ Product added successfully!');
        // Reset form
        setTitle('');
        setDescription('');
        setMainImg(null);
        setSideImages([]);
        // Reset file inputs
        document.getElementById('mainImgInput').value = '';
        document.getElementById('sideImagesInput').value = '';
      } else {
        setStatus(`❌ ${data.message || 'Failed to add product.'}`);
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setStatus('❌ Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex fit-screen">
      {/* Loading Overlay */}
      {isLoading && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75"
          style={{ zIndex: 9999 }}
        >
          <div className="text-center text-white">
            <div className="spinner-border text-light mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-white mb-2">Uploading Product...</h5>
            <p className="text-light mb-0">Please wait while we upload your images and save the product</p>
          </div>
        </div>
      )}

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Content Area */}
      <div className="flex-grow-1 p-3" style={{ marginLeft: '0', marginTop: '10px' }}>
        {/* Toggle Button on Mobile */}
        <button className="btn btn-outline-dark d-md-none mb-3" onClick={() => setIsSidebarOpen(true)}>
        <i class="bi bi-caret-left"></i> Menu
        </button>

        <h3>Add Product</h3>
        <form onSubmit={handleSubmit} className="mt-3" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Product Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Main Image *</label>
          <input
            id="mainImgInput"
            type="file"
            className="form-control"
            onChange={e => setMainImg(e.target.files[0])}
            accept="image/*"
            required
          />
          <div className="form-text">Upload the main product image (required)</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Side Images (Optional)</label>
          <input
            id="sideImagesInput"
            type="file"
            className="form-control"
            onChange={e => setSideImages(Array.from(e.target.files))}
            accept="image/*"
            multiple
          />
          <div className="form-text">Upload additional product images (optional, max 10 files)</div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Adding Product...
            </>
          ) : (
            'Add Product'
          )}
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <div className={`mt-3 alert ${status.includes('✅') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
          {status}
          <button type="button" className="btn-close" onClick={() => setStatus('')} aria-label="Close"></button>
        </div>
      )}
      </div>
    </div>
  );
};

export default AddProduct;
