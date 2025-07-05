import React, { useState, useEffect } from 'react'
import Loader from "../../components/Loader"
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const ModifyProduct = ({ baseURL }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [status, setStatus] = useState('');
  const [loadingMsg, setloadingMsg] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isModalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainImg: '',
    sideImages: []
  });

  // Fetch all products on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/admin")
      return;
    }
    fetchProducts();
  }, []);

  // Setting Filtered Products to All Products in the start
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || '',
        description: selectedProduct.description || '',
        mainImg: selectedProduct.mainImg || '',
        sideImages: selectedProduct.sideImages || []
      });
    }
  }, [selectedProduct]);

  // useEffect(()=>{
  //   console.log("After Update State", formData)
  // }, [formData])

  const fetchProducts = async () => {
    try {
      setLoadingState(true);
      setloadingMsg("Fetching All Products")
      const response = await fetch(`${baseURL}/api/products/`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        setStatus('❌ Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setStatus('❌ Error fetching products');
    } finally {
      setLoadingState(false);
      setloadingMsg("")
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClose = () => {
    setModalOpen(false);
  }

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleMainImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({
      ...prev,
      mainImg: file
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTriggerMainImgInput = () => {
    document.getElementById("mainImg").click();
  }
  const handleTriggerSideImgInput = () => {
    document.getElementById("sideImg").click();
  }

  const handleSideImgChange = (e) => {
    const { files } = e.target;

    const newFiles = Array.from(files);

    setFormData((prev) => ({
      ...prev,
      sideImages: [...prev.sideImages, ...newFiles],
    }));
  };

  const handleRemoveSideImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      sideImages: prev.sideImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  const onSave = async () => {
    setLoadingState(true)
    setloadingMsg("Updating Product...")
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);

    if (formData.mainImg) {
      data.append('mainImg', formData.mainImg); // ✅ this is your file
    }

    // Only append new files (Files)
    formData.sideImages.forEach((img) => {
      if (img instanceof File) {
        data.append("sideImages", img);
      }
    });

    // Also send old images (URLs) in a separate field
    // console.log("SideImages Before Sending", formData.sideImages)
     // Filter only valid existing URLs to avoid "{}" error
  const existingURLs = formData.sideImages.filter(
    (img) => typeof img === 'string' && img.startsWith('http')
  );

    data.append("existingSideImages", JSON.stringify(existingURLs));

    // console.log("Data after sending form", data)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${baseURL}/api/products/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
          // Do NOT set Content-Type, browser will do it automatically
          Authorization: `Bearer ${token}`, // if using auth
        },
        body: data
      });

      const result = await res.json();
      if (result.success) {
        setStatus("✅ Product Updated Successfully")
        await fetchProducts();
      } else {
        setStatus(`❌ Update failed:', ${result.message}`)
        console.error('❌ Update failed:', result.message);
      }
    } catch (error) {
      setStatus(`❌ Network or server error:', ${error}`)
      console.error('❌ Network or server error:', error);
    } finally {
      handleClose();
      setLoadingState(false)
      setloadingMsg("")
    }
  };

  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className='d-flex fit-screen'>
      {loadingState && <Loader message={loadingMsg} />}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-grow-1 content-area p-3">
        {/* MOdal */}
        <div className={`modal fade ${isModalOpen ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: "56px" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Main Image</label>
                  <input
                    type="file"
                    className="form-control"
                    hidden
                    accept="image/*"
                    name="mainImg"
                    id='mainImg'
                    // value={formData.mainImg}
                    onChange={handleMainImgChange}
                  />
                  {formData.mainImg && (
                    <div className="d-flex gap-2">
                      <div className='position-relative'>
                        <img src={formData.mainImg instanceof File ? URL.createObjectURL(formData.mainImg) : formData.mainImg} alt="Main" className="img-fluid mt-2 rounded" style={{ height: '100px', width: "100px", objectFit: "cover" }} />
                      </div>
                      <div className="d-flex mt-2 justify-content-center align-items-center rounded flex-column" style={{ border: "1px dashed black", height: '100px', width: "100px", cursor: "pointer" }}
                        onClick={handleTriggerMainImgInput}
                      >
                        <i class="bi bi-cloud-arrow-up-fill"></i>
                        <p className='text-center' style={{ fontSize: "14px" }}>Upload new main img</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Side Images</label>
                  <input
                    type="file"
                    className="form-control"
                    hidden
                    multiple
                    accept="image/*"
                    name="sideImg"
                    id='sideImg'
                    // value={formData.mainImg}
                    onChange={handleSideImgChange}
                  />
                  <div className="d-flex gap-2">
                    {formData.sideImages.map((img, index) => (
                      <div className='position-relative'>
                        <img src={img instanceof File ? URL.createObjectURL(img) : img} alt="Main" className="img-fluid mt-2 rounded" style={{ height: '100px', width: "100px", objectFit: "cover" }} />
                        <button className='position-absolute border-0 rounded bg-danger top-0 end-0'
                          onClick={() => handleRemoveSideImage(index)}
                        >
                          <i class="bi bi-x text-white"></i>
                        </button>
                      </div>
                    ))}
                    {formData.sideImages.length <= 10 ? (
                      <div className="d-flex mt-2 justify-content-center align-items-center rounded flex-column" style={{ border: "1px dashed black", height: '100px', width: "100px", cursor: "pointer" }}
                      onClick={handleTriggerSideImgInput}
                    >
                      <i class="bi bi-cloud-arrow-up-fill"></i>
                      <p className='text-center' style={{ fontSize: "14px" }}>Upload new side img</p>
                    </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={onSave}>Save Changes</button>
              </div>

            </div>
          </div>
        </div>
        {/* Toggle Button on Mobile */}
        <button className="btn btn-outline-dark d-md-none mb-3" onClick={() => setIsSidebarOpen(true)}>
          <i className="bi bi-caret-left"></i> Menu
        </button>
        <h3 className="mb-4">Edit Products</h3>

        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="position-relative">
              <input
                id="product-search-input"
                type="text"
                className="form-control pe-5"
                placeholder="Search products by title..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-1"
                  onClick={clearSearch}
                  title="Clear search"
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
              {!searchQuery && (
                <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
              )}
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`alert ${status.includes('✅') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
            {status}
            <button type="button" className="btn-close" onClick={() => setStatus('')} aria-label="Close"></button>
          </div>
        )}

        {/* Products Count and Search Info */}
        <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap">
          <small className="text-muted">
            {searchQuery ? (
              <>
                {filteredProducts.length} of {products.length} product{products.length !== 1 ? 's' : ''} match "{searchQuery}"
              </>
            ) : (
              <>
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </>
            )}
          </small>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-box-seam display-1 text-muted"></i>
            <h5 className="mt-3 text-muted">No products found</h5>
            <p className="text-muted">There are no products to delete.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h5 className="mt-3 text-muted">No products match your search</h5>
            <p className="text-muted">Try searching with different keywords or <button className="btn btn-link p-0" onClick={clearSearch}>clear the search</button>.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  {/* Product Image */}
                  <div className="position-relative">
                    <img
                      src={product.mainImg}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      }}
                    />

                    {/* Delete Button Overlay */}
                    <button
                      className="btn btn-danger position-absolute top-0 end-0 m-2"
                      onClick={() => handleEditProduct(product)}
                      disabled={loadingState}
                      title="Delete Product"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-truncate" title={product.title}>
                      {product.title}
                    </h6>
                    <p className="card-text text-muted small flex-grow-1">
                      {truncateText(product.description)}
                    </p>

                    {/* Product Info */}
                    <div className="mt-auto">
                      <small className="text-muted d-block">
                        <i className="bi bi-calendar"></i> {new Date(product.createdAt).toLocaleDateString()}
                      </small>
                      {product.sideImages && product.sideImages.length > 0 && (
                        <small className="text-muted d-block">
                          <i className="bi bi-images"></i> {product.sideImages.length + 1} images
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModifyProduct