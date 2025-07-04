import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';


const ModifyProduct = ({baseURL}) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(null);
  const [status, setStatus] = useState('');

  // Fetch all products on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/admin")
      return;
    }
    fetchProducts();
  }, []);

  // Filter products based on search query (title only)
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const handleEditProduct = async (productId, productTitle) => {
    // Show confirmation dialog
    // const isConfirmed = window.confirm(
    //   `Are you sure you want to delete "${productTitle}"?\n\nThis action cannot be undone and will permanently remove the product and all its images.`
    // );
    
    // if (!isConfirmed) return;

    try {
      setEditLoading(productId);
      console.log(editLoading)
      setStatus('');

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus('❌ Please login first.');
        setEditLoading(null);
        return;
      }

      // const response = await fetch(`${baseURL}/api/products/${productId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // const data = await response.json();
      
      // if (response.ok && data.success) {
      //   setStatus('✅ Product deleted successfully!');
      //   // Remove the deleted product from the state
      //   setProducts(products.filter(product => product._id !== productId));
      // } else {
      //   setStatus(`❌ ${data.message || 'Failed to delete product'}`);
      // }
    } catch (error) {
      console.error('Error deleting product:', error);
      setStatus('❌ Server error. Please try again.');
    } finally {
      setEditLoading(null);
    }
  };

  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };


  return (
    <div className="d-flex fit-screen">
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
      <div className="flex-grow-1 content-area p-3">
        {/* Toggle Button on Mobile */}
        <button className="btn btn-outline-dark d-md-none mb-3" onClick={() => setIsSidebarOpen(true)}>
          <i className="bi bi-caret-left"></i> Menu
        </button>

        <h3 className="mb-4">Modify Products</h3>
        
        {editLoading ? "Show Modal" : (
          <>
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

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading products...</p>
          </div>
        ) : (
          <>
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
              {searchQuery && (
                <button className="btn btn-sm btn-outline-secondary" onClick={clearSearch}>
                  <i className="bi bi-x-circle me-1"></i>
                  Clear search
                </button>
              )}
            </div>

            {/* Products Grid */}
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
                          onClick={() => handleEditProduct(product._id, product.title)}
                          disabled={editLoading === product._id}
                          title="Delete Product"
                        >
                          {editLoading === product._id ? (
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                          ) : (
                            <i className="bi bi-trash3"></i>
                          )}
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
          </>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModifyProduct;
