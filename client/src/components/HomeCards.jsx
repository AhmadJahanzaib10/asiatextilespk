import React from 'react';
import HomeCard from './HomeCard';

const HomeCards = () => {
  const homeTextiles = [
    {
      id: 1,
      title: "Kitchen Towel",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Table Linen",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Institutional Textile",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Customized Items",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    }
  ];

  // Sample data for Ready Made
  const readyMade = [
    {
      id: 1,
      title: "SHIRTS",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "PJ SETS",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "BOXER SHORTS",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "PJ/ LOUNGE PANTS PANTS",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "HOODED SHIRT/ JACKET",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "HOODIES",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      title: "SWEATSHIRT",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      title: "CREWNECK",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    },
    {
      id: 9,
      title: "JOGGER PANTS",
      defaultImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=300&fit=crop"
    }
  ];
  return (
    <div className="container-fluid px-0 py-4">
      <div className="row gap--3">
        {/* Home Textiles Section */}
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h3 className='primary-font'>Home Textiles</h3>
          </div>
          <div className="row g-3">
            {homeTextiles.map((product, key)=>(
              <div key={key} className="col-md-6 col-sm-12">
                <HomeCard product={product}/>
              </div>
            ))}
          </div>
        </div>

        {/* Ready Made Section */}
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h3 className='primary-font'>Ready Made</h3>
          </div>
          <div className="row g-3">
          {readyMade.map((product, key)=>(
              <div key={key} className="col-md-6 col-sm-12">
                <HomeCard product={product}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;