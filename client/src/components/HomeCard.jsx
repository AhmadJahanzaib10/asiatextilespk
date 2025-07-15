import React from 'react'

const HomeCard = ({product}) => {
  const capitalizeEachWord = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
        <div className="card h-100 product-card" style={{ cursor: 'pointer', overflow: 'hidden' }}>
          <div className="card-img-top-container" style={{ height: '200px', overflow: 'hidden' }}>
            <img 
              src={product.defaultImage} 
              className="card-img-top product-image" 
              alt={product.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
            <img 
              src={product.hoverImage} 
              className="card-img-top product-image-hover" 
              alt={product.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title fs-6 secondary-font">{capitalizeEachWord(product.title)}</h5>
          </div>
        </div>
      );
}

export default HomeCard