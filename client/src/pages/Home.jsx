import React, { useState, useEffect } from 'react'
// Import CSS file
import '../assets/css/home.css'
import heroBg from '../assets/images/hero-bg.jpg';
import HomeCards from '../components/HomeCards'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat';

const Home = () => {
  // Sample data - replace with your database fetch
  const [marqueeItems, setMarqueeItems] = useState([
    "🎉 New Collection: Premium Cotton Fabrics Now Available",
    "📢 Free Shipping on Orders Above $500",
    "⚡ Limited Time Offer: 20% Off on Bulk Orders"
  ])

  // Sample data for Certifications
  const certifications = [
    {
      id: 1,
      title: "ISO 9001",
      defaultImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "OEKO-TEX",
      defaultImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "GOTS Certified",
      defaultImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
      hoverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    }
  ];


  // Function to duplicate items for seamless loop
  const getDuplicatedItems = (items) => {
    if (items.length === 0) return []

    // Calculate how many times to duplicate based on content length
    const minDuplicates = Math.max(3, Math.ceil(10 / items.length))
    const duplicatedItems = []

    for (let i = 0; i < minDuplicates; i++) {
      duplicatedItems.push(...items)
    }

    return duplicatedItems
  }

  const duplicatedItems = getDuplicatedItems(marqueeItems)

  return (
    <div className='pt-75'>

      {marqueeItems.length > 0 && (
        <section className="py-2 marquee-section">
          <div className="marquee-container">
            <div
              className="marquee-content"
              data-item-count={marqueeItems.length}
            >
              {duplicatedItems.map((item, index) => (
                <span key={index} className="marquee-item secondary-font">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Info */}

      <section className="py-5" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBg})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",

      }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Brand Name */}
            <div className="mb-6">
              <h1 className="primary-font brand-title font-bold text-white mb-3">
                <span style={{ color: '#01923E' }}>Asia</span> Textiles
              </h1>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#01923E' }}></div>
            </div>
            {/* Lorem Text */}
            <div className="max-w-3xl mx-auto">
              <p className="text-white secondary-font leading-relaxed text-lg mb-4">
              MANUFACTURER AND EXPORTER OF HOMETEXTILES AND READYMADE GARMENTS/APPAREL
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <HomeCards />

        {/* Certifications Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="text-center mb-4">
              <h1 className='primary-font fs-2'>Certifications</h1>
            </div>
            <div className="row g-3 justify-content-center">
              {certifications.map((certification) => (
                <div key={certification.id} className="col-md-4 col-sm-6">
                  <img style={{width: "100%", objectFit: "cover"}} src={certification.defaultImage} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Contact/>
      <WhatsAppFloat/>
      <Footer/>
    </div>
  )
}

export default Home