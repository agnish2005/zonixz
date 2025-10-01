import React, { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import marble3 from "../assets/Image/marble3.webp";
import marble4 from "../assets/Image/marble4.webp";
import './RecentlyViewedPage.css';

const RecentlyViewedPage = () => {
  const recentItems = [
    {
      id: 1,
      title: "Stylish Running Shoes for Men",
      price: "₹79.99",
      rating: 5,
      lastViewed: "Yesterday",
      image: marble3
    },
    {
      id: 2,
      title: "Stylish Running Shoes for Men",
      price: "₹79.99",
      rating: 5,
      lastViewed: "Yesterday",
      image: marble4
    }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    // Add navigation logic here
    console.log('Back button clicked');
  };

  const handleRemoveItem = (itemId) => {
    // Add remove item logic here
    console.log('Remove item:', itemId);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`rv-star ${index < rating ? 'rv-star-filled' : 'rv-star-empty'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="rv-container">
      {/* Header */}
      <div className="rv-header">
        <button className="rv-back-button" onClick={handleBackClick}>
          <IoIosArrowBack className="rv-back-icon" />
        </button>
        <h1 className="rv-header-title">Recently Viewed Items</h1>
      </div>

      {/* Main Content */}
      <div className="rv-content">
        <div className="rv-browsing-section">
          <h2 className="rv-browsing-title">Your Browsing History</h2>
          <p className="rv-browsing-description">
            Use this page to set your preferred payment method, shipping address, and shipping method.
          </p>
        </div>

        {/* Items List */}
        <div className="rv-items-list">
          {recentItems.map((item) => (
            <div key={item.id} className="rv-item-card">
              <div className="rv-item-image-container">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="rv-item-image"
                />
              </div>
              
              <div className="rv-item-details">
                <h3 className="rv-item-title">{item.title}</h3>
                
                <div className="rv-rating-container">
                  {renderStars(item.rating)}
                </div>
                
                <div className="rv-price-container">
                  <span className="rv-price">{item.price}</span>
                  <span className="rv-price-suffix">/-</span>
                </div>
                
                <p className="rv-last-viewed">
                  Last viewed: {item.lastViewed}
                </p>
                
                <button 
                  className="rv-remove-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedPage;