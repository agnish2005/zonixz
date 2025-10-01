import React from "react";
import "./Toppick.css";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import banner from "../assets/Image/banner.png";
import pa from "../assets/Image/pa.png";
import cements from "../assets/Image/cements.jpg";
import steel from "../assets/Image/steel.jpg";
import marble1 from "../assets/Image/marble1.webp";
import brand1 from "../assets/Image/brand1.png";
import brand2 from "../assets/Image/brand2.png";
import brand3 from "../assets/Image/brand3.png";

const Toppick = () => {
  const products = [
    {
      id: 1,
      image: pa,
      discount: "22% Off",
      title: "Plywood",
      sku: "PLY-001-PRE",
      rating: 4.5,
      reviews: "75.5k",
      price: "520.0",
      mrp: "670.0",
    },
    {
      id: 2,
      image: cements,
      discount: "17% Off",
      title: "Ambuja Cement",
      sku: "CMT-001-PRE",
      rating: 5.0,
      reviews: "75.5k",
      price: "600.0",
      mrp: "720.0",
    },
    {
      id: 3,
      image: steel,
      discount: "15% Off",
      title: "Steel",
      sku: "STL-001-PRE",
      rating: 5.0,
      reviews: "82.3k",
      price: "450.0",
      mrp: "530.0",
    },
    {
      id: 4,
      image: marble1,
      discount: "15% Off",
      title: "marble",
      sku: "STL-001-PRE",
      rating: 5.0,
      reviews: "82.3k",
      price: "450.0",
      mrp: "530.0",
    },
  ];

  const discountBrands = [
    {
      id: 1,
      image: brand1,
      discount: "Extra 5% off"
    },
    {
      id: 2,
      image: brand2,
      discount: "Extra 5% off"
    },
    {
      id: 3,
      image: brand3,
      discount: "Extra 5% off"
    },
    {
      id: 4,
      image: brand2,
      discount: "Extra 5% off"
    }
  ];

  // Reviews data (copied from Details.js)
  const reviewsData = {
    averageRating: 4.4,
    totalReviews: 286,
    reviews: [
      {
        id: 1,
        name: "Amit Siraj",
        rating: 4.4,
        title: "Truly a Premium Experience!",
        date: "13 July 2025",
        location: "India",
        content:
          "Cement is a strong, durable, and essential building material. It offers excellent binding properties, long-lasting performance, and is ideal for construction, masonry, and repair works of all kinds.",
        images: [marble1, pa, steel],
      },
      {
        id: 2,
        name: "Amit Siraj",
        rating: 4.4,
        title: "Truly a Premium Experience!",
        date: "13 July 2025",
        location: "India",
        content:
          "Cement is a strong, durable, and essential building material. It offers excellent binding properties, long-lasting performance, and is ideal for construction, masonry, and repair works of all kinds.",
        images: [marble1, pa, steel],
      },
    ],
  };

  return (
    <>
      <div className="toppick-main-container">
        <div className="toppick-header-section">
          <h2 className="toppick-main-title">Top Picks For You</h2>
          <span className="toppick-show-all-link">Show All</span>
        </div>

        <div className="toppick-products-grid">
          {products.map((product) => (
            <div key={product.id} className="toppick-product-card">
              <div className="toppick-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="toppick-product-image"
                />
                <div className="toppick-discount-badge">{product.discount}</div>
                <div className="toppick-heart-icon">
                  <FiHeart className="toppick-heart-svg" />
                </div>
              </div>

              <div className="toppick-content-section">
                <h3 className="toppick-product-title">{product.title}</h3>
                <p className="toppick-product-sku">SKU: {product.sku}</p>

                <div className="toppick-rating-container">
                  <span className="toppick-rating-number">
                    {product.rating}
                  </span>
                  <div className="toppick-stars-wrapper">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`toppick-star ${
                          index < Math.floor(product.rating)
                            ? "toppick-star-filled"
                            : "toppick-star-empty"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="toppick-reviews-count">
                    ({product.reviews})
                  </span>
                </div>

                <div className="toppick-price-section">
                  <span className="toppick-current-price">
                    ₹ {product.price}
                  </span>
                  <span className="toppick-mrp-price">MRP ₹{product.mrp}</span>
                </div>

                <button className="toppick-add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="toppick-banner-container">
        <img
          src={banner}
          alt="Promotional Banner"
          className="toppick-banner-image"
        />
      </div>
      <div className="grid-top">
        <div className="discount-brands-container">
          <h2 className="discount-brands-title">Top Discount Brands</h2>
          <div className="discount-brands-grid">
            {discountBrands.map((brand) => (
              <div key={brand.id} className="discount-brand-card">
                <div className="discount-brand-image-container">
                  <img
                    src={brand.image}
                    alt={`Brand ${brand.id}`}
                    className="discount-brand-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section - Added here */}
        <div className="info-section" style={{ padding: '8px' , marginTop: '20px' }}>
          <div className="reviews-header">
            <h2 className="reviews-title">Customer Reviews</h2>
            <IoChevronForward className="reviews-arrow" />
          </div>

          <div className="reviews-summary">
            <div className="reviews-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <IoIosStar key={i} className="review-star" />
                ))}
              </div>
              <span className="rating-text">
                {reviewsData.averageRating} out of 5
              </span>
            </div>
            <p className="reviews-count">
              {reviewsData.totalReviews} Global Reviews
            </p>
          </div>

          <div className="reviews-list">
            {reviewsData.reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-avatar">
                    <img src={marble1} alt={review.name} />
                  </div>
                  <div className="reviewer-info">
                    <h4 className="reviewer-name">{review.name}</h4>
                  </div>
                </div>

                <div className="review-rating">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <IoIosStar key={i} className="review-star" />
                    ))}
                  </div>
                  <span className="rating-text">{review.rating} out of 5</span>
                </div>

                <h3 className="review-title">{review.title}</h3>
                <p className="review-date">
                  Reviewed in {review.location} on {review.date}
                </p>

                <div className="review-images">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="review-image"
                    />
                  ))}
                </div>

                <p className="review-content">{review.content}</p>
              </div>
            ))}
          </div>

          {/* Review Buttons Section */}
          <div className="review-buttons">
            <button className="see-more-reviews-btn">
              See more reviews
              <IoChevronForward />
            </button>

            <button className="add-review-btn5">Add Reviews</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toppick;