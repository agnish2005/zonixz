import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import marble3 from "../assets/Image/marble3.webp";
import marble4 from "../assets/Image/marble4.webp";
import './ReviewPurchasesPage.css';

const ReviewPurchasesPage = () => {
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'addReview'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Scroll to top when component mounts or view changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [currentView]);

  const products = [
    {
      id: 1,
      name: 'Stylish Bluetooth Headphones with Noise Cancellation',
      image: marble3,
      rating: 0
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair with Lumbar Support',
      image: marble4,
      rating: 0
    }
  ];

  const handleAddReview = (product) => {
    setSelectedProduct(product);
    setCurrentView('addReview');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedProduct(null);
    setRating(0);
    setReviewText('');
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleSubmitReview = () => {
    // Handle review submission logic here
    console.log('Submitting review:', {
      product: selectedProduct,
      rating,
      reviewText
    });
    handleBackToMain();
  };

  const renderStars = (currentRating, isInteractive = false, isLarge = false) => {
    return (
      <div className={`rpp-stars-container ${isLarge ? 'rpp-stars-large' : ''}`}>
        {[0, 1, 2, 3, 4].map((index) => (
          <span
            key={index}
            className={`rpp-star ${currentRating > index ? 'rpp-star-filled' : 'rpp-star-empty'} ${
              isInteractive ? 'rpp-star-interactive' : ''
            }`}
            onClick={isInteractive ? () => handleStarClick(index) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (currentView === 'addReview') {
    return (
      <div className="rpp-container">
        <div className="rpp-header">
          <button className="rpp-back-button" onClick={handleBackToMain}>
            <IoIosArrowBack className="rpp-back-icon" />
          </button>
          <h1 className="rpp-title">Add Your Review</h1>
        </div>

        <div className="rpp-add-review-content">
          <div className="rpp-product-card-small">
            <img 
              src={selectedProduct?.image} 
              alt={selectedProduct?.name}
              className="rpp-product-image-small"
            />
            <div className="rpp-product-info-small">
              <h3 className="rpp-product-name-small">{selectedProduct?.name}</h3>
            </div>
          </div>

          <div className="rpp-rating-section">
            <h3 className="rpp-rating-label">Rate this product:</h3>
            {renderStars(rating, true, true)}
          </div>

          <div className="rpp-review-section">
            <h3 className="rpp-review-label">Write your review:</h3>
            <textarea
              className="rpp-review-textarea"
              placeholder="Share your thoughts about the product..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>

          <div className="rpp-upload-section">
            <h3 className="rpp-upload-label">Upload product images:</h3>
            <button className="rpp-select-images-button">
              Select Images
            </button>
          </div>
        </div>

        <button className="rpp-submit-button" onClick={handleSubmitReview}>
          Submit Review
        </button>
      </div>
    );
  }

  return (
    <div className="rpp-container">
      <div className="rpp-header">
        <button className="rpp-back-button">
          <IoIosArrowBack className="rpp-back-icon" />
        </button>
        <h1 className="rpp-title">Review Your Purchases</h1>
      </div>

      <div className="rpp-content">
        {products.map((product) => (
          <div key={product.id} className="rpp-product-card">
            <img 
              src={product.image} 
              alt={product.name}
              className="rpp-product-image"
            />
            <div className="rpp-product-info">
              <h3 className="rpp-product-name">{product.name}</h3>
              {renderStars(product.rating)}
              <button 
                className="rpp-add-review-link"
                onClick={() => handleAddReview(product)}
              >
                Add a review
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="rpp-submit-ratings-button">
        Submit Ratings & Continue
      </button>
    </div>
  );
};

export default ReviewPurchasesPage;