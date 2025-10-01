import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Details.css";
import tag from "../assets/Image/tag.png";
import { IoIosStar } from "react-icons/io";
import marble1 from "../assets/Image/marble1.webp";
import marble2 from "../assets/Image/marble2.jpg";
import marble3 from "../assets/Image/marble3.webp";
import marble4 from "../assets/Image/marble4.webp";
import { IoLocation } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

// TopBar Component with Navigation Links
const TopBar = ({ productTitle, currentPrice, originalPrice, scrollToSection }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="top-bar-product-info">
          <h3 className="top-bar-title">{productTitle}</h3>
        </div>
        <div className="top-bar-navigation">
          <button className="nav-link" onClick={() => scrollToSection('product-details')}>Product Details</button>
          <button className="nav-link" onClick={() => scrollToSection('product-specification')}>Specification</button>
          <button className="nav-link" onClick={() => scrollToSection('customer-reviews')}>Reviews</button>
          <button className="nav-link" onClick={() => scrollToSection('explore-product')}>Explore</button>
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pincodeInput, setPincodeInput] = useState("");
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showTopBar, setShowTopBar] = useState(false);
  const imageContainerRef = useRef(null);
  
  // Refs for each section
  const productDetailsRef = useRef(null);
  const productSpecificationRef = useRef(null);
  const customerReviewsRef = useRef(null); // This will trigger the top bar
  const exploreProductRef = useRef(null);

  // Intersection Observer for Customer Reviews Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show top bar when Customer Reviews section enters viewport
        setShowTopBar(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '-100px 0px 0px 0px' // Adjust trigger point
      }
    );

    if (customerReviewsRef.current) {
      observer.observe(customerReviewsRef.current);
    }

    return () => {
      if (customerReviewsRef.current) {
        observer.unobserve(customerReviewsRef.current);
      }
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    let targetRef = null;
    
    switch(sectionId) {
      case 'product-details':
        targetRef = productDetailsRef;
        break;
      case 'product-specification':
        targetRef = productSpecificationRef;
        break;
      case 'customer-reviews':
        targetRef = customerReviewsRef;
        break;
      case 'explore-product':
        targetRef = exploreProductRef;
        break;
      default:
        return;
    }
    
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // ✅ Replace placeholders with your imported images
  const productImages = [marble1, marble2, marble3, marble4];

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePincodeSearch = () => {
    if (pincodeInput.trim()) {
      console.log("Searching for pincode:", pincodeInput);
      // Add your pincode search logic here
      alert(`Searching delivery options for pincode: ${pincodeInput}`);
    }
  };

  const handleShowAllSpecs = () => {
    setShowAllSpecs(!showAllSpecs);
  };

  // Swipe handlers - UPDATED WITH EVENT PREVENTION
  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    e.stopPropagation(); // Stop event from bubbling up
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    e.stopPropagation(); // Stop event from bubbling up
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    e.stopPropagation(); // Stop event from bubbling up
    
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // Minimum swipe distance
    const isRightSwipe = distance < -50; // Minimum swipe distance

    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentImageIndex((prev) =>
        prev === productImages.length - 1 ? 0 : prev + 1
      );
    } else if (isRightSwipe) {
      // Swipe right - previous image
      setCurrentImageIndex((prev) =>
        prev === 0 ? productImages.length - 1 : prev - 1
      );
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  const orderItems = [
    {
      id: 1,
      title: "Stylish Headphones",
      image: marble1,
    },
    {
      id: 2,
      title: "Ergonomic Gaming Mouse",
      image: marble2,
    },
    {
      id: 3,
      title: "Stylish Headphones",
      image: marble3,
    },
    {
      id: 4,
      title: "Ergonomic Gaming Mouse",
      image: marble4,
    },
  ];

  const productSpecs = [
    { label: "Brand", value: "Woodsworth from Pepperfry" },
    { label: "Sku", value: "FN1745917-S-PM3427" },
    { label: "Sofa Firmness", value: "Medium" },
    { label: "Product Rating", value: "4.5" },
    { label: "Seating Height", value: "18" },
    { label: "Assembly", value: "Carpenter Assembly" },
    { label: "Collections", value: "Andres" },
    { label: "Warranty", value: "36 Months' Warranty" },
  ];

  const productSpecifications = [
    {
      text: "The manufacturer or company producing the cement (e.g., UltraTech, ACC, Ambuja).",
    },
    { text: "Cement grade as per IS standards (e.g., 53 Grade, 43 Grade)." },
    {
      text: "OPC (Ordinary Portland Cement), PPC (Portland Pozzolana Cement), PSC (Portland Slag Cement), etc.",
    },
    { text: "Weight of the cement bag (usually 50 kg)." },
    {
      text: "Strength of cement after 3, 7, and 28 days of curing (e.g., ≥ 53 MPa for 53 Grade OPC).",
    },
    {
      text: "Time taken for cement to start hardening (usually 30 minutes minimum).",
    },
    {
      text: "Time taken for cement to completely set (usually 600 minutes maximum).",
    },
    {
      text: "The particle size or surface area of cement (e.g., ≥ 225 m²/kg).",
    },
  ];

  // Reviews data
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
        images: [marble1, marble2, marble3],
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
        images: [marble1, marble2, marble3],
      },
    ],
  };

  // Similar products data
  const [similarProducts] = useState([
    {
      id: 4,
      name: "Stylish Headphones X200",
      price: 100.0,
      image: marble1,
      liked: false,
    },
    {
      id: 5,
      name: "Ergonomic Gaming Mouse",
      price: 45.5,
      image: marble2,
      liked: false,
    },
    {
      id: 6,
      name: "Premium Cement Grade 53",
      price: 420.0,
      image: marble3,
      liked: false,
    },
    {
      id: 7,
      name: "Construction Sand Fine",
      price: 55.5,
      image: marble4,
      liked: false,
    },
    {
      id: 8,
      name: "Waterproofing Compound",
      price: 299.0,
      image: marble1,
      liked: false,
    },
  ]);

  const toggleLike = (id) => {
    console.log("Toggle like for product:", id);
  };

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    alert(`${product.name} added to cart!`);
  };

  const visibleSpecs = showAllSpecs ? productSpecs : productSpecs.slice(0, 4);

  return (
    <div className="product-details-container">
      {/* TopBar that appears when Customer Reviews section is in viewport */}
      {showTopBar && (
        <TopBar 
          productTitle="Ambuja Cement is a strong and durable cement brand known for its high quality."
          currentPrice="2999"
          originalPrice="4500"
          scrollToSection={scrollToSection}
        />
      )}

      {/* Product Header */}
      <div className="product-header-section">
        <h1 className="product-main-title">
          Ambuja Cement is a strong and durable cement brand known for its high quality.
        </h1>
        <p className="product-sku-code">SKU: CMT-001-PRE</p>

        {/* Rating */}
        <div className="product-rating-wrapper">
          <span className="rating-score">5.0</span>
          <div className="categorie_stars_wrapper_exclusive">
            {[...Array(5)].map((_, i) => (
              <IoIosStar
                key={i}
                size={18}
                className="categorie_star_icon_supreme"
              />
            ))}
          </div>
          <div className="categorie_assurance_badge_premier">
            <img
              src={tag}
              alt="Assured"
              className="categorie_assurance_image_icon"
            />
          </div>
        </div>
      </div>

      {/* Product Image Section with Swipe Support */}
      <div className="product-image-gallery">
        <div
          className="main-image-container"
          ref={imageContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: "grab" }}
        >
          <img
            src={productImages[currentImageIndex]}
            alt="Product"
            className="main-product-image"
          />
        </div>

        {/* Image Navigation Dots */}
        <div className="image-navigation-dots">
          {productImages.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${
                index === currentImageIndex ? "active-dot" : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="product-pricing-section">
        <div className="price-display">
          <span className="currency-symbol1">₹</span>
          <span className="current-price1">2999</span>
        </div>

        <div className="price-details">
          <span className="original-price">MRP ₹4500</span>
          <span className="discount-percentage">(18% Off)</span>
        </div>

        <div className="emi-information">
          <span className="emi-text">EMI starting from ₹4500/month</span>
          <a href="#" className="view-plans-link">
            View Plans
          </a>
        </div>
      </div>

      {/* Order Items Row */}
      <div className="order-1">
        similar variant
        <div className="ecomm-items-row" style={{ marginTop: "0px" }}>
          {orderItems.map((item) => (
            <div key={item.id} className="ecomm-item-card">
              <div className="ecomm-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <h3 className="ecomm-item-title">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Information Section */}
      <div className="delivery-info-section">
        <h2 className="delivery-title">Delivery Details</h2>

        <div className="delivery-date-wrapper">
          <span className="free-delivery-text">FREE Delivery</span>
          <span className="delivery-date">Saturday, 26 August.</span>
          <a href="#" className="delivery-details-link">
            Details
          </a>
        </div>

        <div className="delivery-location-wrapper">
          <IoLocation className="location-icon" />
          <span className="delivery-address">
            Deliver to sanket - Navi Mumbai 410210
          </span>
        </div>

        <div className="stock-status">In Stock</div>

        <div className="pincode-search-wrapper">
          <input
            type="text"
            placeholder="Search"
            className="pincode-search-input"
            value={pincodeInput}
            onChange={(e) => setPincodeInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handlePincodeSearch()}
          />
          <button className="pincode-search-btn" onClick={handlePincodeSearch}>
            Search By Pincode
          </button>
        </div>

        <a href="#" className="wishlist-link">
          Add To Wishlist
        </a>
      </div>

      {/* Product Information in Column Layout */}
      <div className="product-info-column">
        {/* Product Details Section */}
        <div className="info-section" ref={productDetailsRef}>
          <h2 className="info-section-title">Product Details</h2>
          <ul className="specs-list">
            {visibleSpecs.map((spec, index) => (
              <li key={index} className="spec-item">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </li>
            ))}
          </ul>
          {productSpecs.length > 4 && (
            <button className="show-all-btn" onClick={handleShowAllSpecs}>
              {showAllSpecs ? "Show Less" : "Show All"}
            </button>
          )}
        </div>

        {/* Product Specification Section */}
        <div className="info-section" ref={productSpecificationRef}>
          <h2 className="info-section-title">Product Specification</h2>
          <ul className="specs-list specification-list">
            {productSpecifications.map((spec, index) => (
              <li key={index} className="spec-item specification-item">
                <span className="spec-text">{spec.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews Section - This triggers the top bar */}
        <div className="info-section" ref={customerReviewsRef}>
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

        {/* Similar Products Section (Replacing Explore Section) */}
        <div className="info-section" ref={exploreProductRef}>
          <h2 className="info-section-title">Explore Product</h2>
          <div className="products-grid">
            {similarProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <button
                    className={`like-btn ${product.liked ? "liked" : ""}`}
                    onClick={() => toggleLike(product.id)}
                  >
                    <FiHeart />
                  </button>
                </div>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">₹ {product.price.toFixed(1)}</p>
                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <FiShoppingCart size={14} /> Add to Cart
                  </button>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2 className="info-section-title">recently Viewed Product</h2>
          <div className="products-grid">
            {similarProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <button
                    className={`like-btn ${product.liked ? "liked" : ""}`}
                    onClick={() => toggleLike(product.id)}
                  >
                    <FiHeart />
                  </button>
                </div>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">₹ {product.price.toFixed(1)}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  <FiShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="product-action-buttons">
        <button className="add-to-cart-btn1">ADD TO CART</button>
        <button className="buy-now-btn1">BUY NOW</button>
      </div>
    </div>
  );
};

export default Details;