import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import './Coupon.css';
import kotak from '../assets/Image/kotak.png';

const Coupon = () => {
  const [expandedCoupons, setExpandedCoupons] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const couponsData = [
    {
      id: 1,
      title: "Flat 50% off on Kotak Credit Card",
      code: "KOTAK50",
      image: kotak,
      type: 'percentage',
      value: 50,
      maxDiscount: 100,
      details: [
        "Valid till 31st Dec 2023",
        "Minimum purchase of ₹500 required",
        "Applicable on first order only",
        "Cannot be combined with other offers",
        "Valid for new users only",
        "Discount capped at ₹100",
        "Excludes certain categories",
        "Terms and conditions apply"
      ]
    },
    {
      id: 2,
      title: "Get ₹100 cashback on first order",
      code: "NEWUSER100",
      image: kotak,
      type: 'fixed',
      value: 100,
      details: [
        "Valid for new users only",
        "Cannot be combined with other offers",
        "Discount capped at ₹100",
        "Excludes certain categories",
      ]
    },
    {
      id: 3,
      title: "Free shipping on orders above ₹499",
      code: "FREESHIP",
      image: kotak,
      type: 'fixed',
      value: 20,
      details: [
        "Valid on all orders above ₹499",
        "Applicable to standard shipping only",
        "Cannot be combined with other shipping offers",
        "Valid until 31st December 2023"
      ]
    },
    {
      id: 4,
      title: "Get ₹75 off on orders above ₹300",
      code: "SAVE75",
      image: kotak,
      type: 'fixed',
      value: 75,
      details: [
        "Valid for all users",
        "Minimum order value ₹300",
        "Cannot be combined with other offers",
        "Valid until 31st December 2023"
      ]
    },
    {
      id: 5,
      title: "25% off on all beverages",
      code: "DRINK25",
      image: kotak,
      type: 'percentage',
      value: 25,
      details: [
        "Valid on beverage category only",
        "No minimum order value",
        "Cannot be combined with other offers",
        "Valid until 31st December 2023"
      ]
    },
  ];

  // Filter coupons based on search term
  const filteredCoupons = couponsData.filter(coupon => 
    coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCouponDetails = (couponId) => {
    setExpandedCoupons(prev => ({
      ...prev,
      [couponId]: !prev[couponId]
    }));
  };

  const handleApply = (coupon) => {
    console.log(`Applied coupon: ${coupon.code}`);
    
    if (location.state?.fromCart) {
      navigate(-1, { 
        state: { 
          appliedCoupon: {
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            maxDiscount: coupon.maxDiscount
          }
        } 
      });
    } else {
      alert(`Coupon ${coupon.code} applied successfully!`);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="coupon-container">
      {/* Header */}
      <div className="coupon-header">
        <button className="coupon-back-arrow" onClick={handleBack}>
          <IoIosArrowBack size={25} />
        </button>
        <h1 className="coupon-header-title">Available Coupons</h1>
      </div>

      {/* Search Section */}
      <div className="coupon-search-section">
        <form className="coupon-search-container" onSubmit={handleSearch}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              className="coupon-search-input"
              placeholder="Search coupons by title or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingRight: searchTerm ? '30px' : '14px' }}
            />
            {searchTerm && (
              <button 
                type="button"
                className="coupon-clear-btn"
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  color: '#999',
                  fontSize: '18px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            )}
          </div>
          <button type="submit" className="coupon-apply-btn">
            Search
          </button>
        </form>
      </div>

      {/* Coupon List */}
      <div className="coupon-list">
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <div key={coupon.id} className="coupon-card">
              <div className="coupon-card-main">
                <div className="coupon-logo">
                  <img src={coupon.image} alt="Coupon Logo" className="coupon-image" />
                </div>
                <div className="coupon-content1">
                  <h3 className="coupon-title">{coupon.title}</h3>
                  <p className="coupon-code">Use code: {coupon.code}</p>
                </div>
                <button 
                  className="coupon-card-apply-btn"
                  onClick={() => handleApply(coupon)}
                >
                  Apply
                </button>
              </div>
              
              {/* Always visible details (first 2 items) */}
              <div className="coupon-details">
                <ul className="coupon-details-list">
                  {coupon.details.slice(0, 2).map((detail, index) => (
                    <li key={index} className="coupon-details-item">
                      {detail}
                    </li>
                  ))}
                  
                  {/* Expandable details (remaining items) */}
                  {expandedCoupons[coupon.id] && 
                    coupon.details.slice(2).map((detail, index) => (
                      <li key={index + 2} className="coupon-details-item">
                        {detail}
                      </li>
                    ))
                  }
                </ul>
              </div>
              
              {/* Toggle Button - only show if there are more than 2 details */}
              {coupon.details.length > 2 && (
                <div style={{ padding: '0' }}>
                  <button 
                    className="coupon-toggle-btn"
                    onClick={() => toggleCouponDetails(coupon.id)}
                  >
                    {expandedCoupons[coupon.id] ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#666'
          }}>
            <p>No coupons found matching "{searchTerm}"</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;