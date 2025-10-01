import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import marble1 from "../assets/Image/marble1.webp";
import marble2 from "../assets/Image/marble2.jpg";
import marble3 from "../assets/Image/marble3.webp";
import marble4 from "../assets/Image/marble4.webp";
import { FaPlus } from "react-icons/fa";
import { FiHeart, FiShoppingCart, FiChevronRight } from "react-icons/fi";
import backgroundImage from "../assets/Image/new.png";
import buy1 from "../assets/Image/buy1.png";
import your from "../assets/Image/your.png";
import wishlist from "../assets/Image/wishlist.png";
import addressIcon from "../assets/Image/location.png";
import purchaseIcon from "../assets/Image/setting.png";
import reviewIcon from "../assets/Image/rating.png";
import recentIcon from "../assets/Image/trolley.png";
import paymentIcon from "../assets/Image/operation.png";
import closeAccountIcon from "../assets/Image/closeacc.png";
import logoutIcon from "../assets/Image/logout.png";

const Profile = () => {
  const navigate = useNavigate();

  // Sample data - replace with your actual data
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

  const buyAgainItems = [
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

  const wishlistItems = [
    {
      id: 1,
      name: "Stylish Headphones X200",
      price: 100.0,
      image: marble1,
      liked: false,
    },
    {
      id: 2,
      name: "Ergonomic Gaming Mouse",
      price: 45.5,
      image: marble2,
      liked: false,
    },
    {
      id: 3,
      name: "Stylish Headphones X200",
      price: 100.0,
      image: marble3,
      liked: false,
    },
    {
      id: 4,
      name: "Ergonomic Gaming Mouse",
      price: 45.5,
      image: marble4,
      liked: false,
    },
  ];

  // Account menu items
  const accountMenuItems = [
    {
      id: 1,
      icon: addressIcon,
      title: "Your Addresses",
      subtitle: "Manage your saved addresses.",
      onClick: () => navigate("/addresses", { state: { fromProfile: true } }), // Add navigation state
    },
    {
      id: 2,
      icon: purchaseIcon,
      title: "Default Purchase Settings",
      subtitle: "Manage your default purchase settings.",
      onClick: () => navigate("/purchase-settings"),
    },
    {
      id: 3,
      icon: reviewIcon,
      title: "Review Your Purchases",
      subtitle: "View your past purchases and leave feedback.",
      onClick: () => navigate("/review-purchases"),
    },
    {
      id: 4,
      icon: recentIcon,
      title: "Your Recently View Items",
      subtitle: "View your recently viewed items.",
      onClick: () => navigate("/recently-viewed"),
    },
    {
      id: 5,
      icon: paymentIcon,
      title: "Manage Payment Option",
      subtitle: "Add, remove, or edit your payment methods.",
      onClick: () => console.log("Navigate to payment options"),
    },
    {
      id: 6,
      icon: closeAccountIcon,
      title: "Close Your zonixzz Account",
      subtitle: "Permanently close your zonixzz account.",
      onClick: () => console.log("Navigate to close account"),
    },
    {
      id: 7,
      icon: logoutIcon,
      title: "Logout",
      subtitle: "Logout from your zonixzz account.",
      onClick: () => console.log("Logout user"),
    },
  ];

  // Function to handle add to cart
  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
    // Add your add to cart logic here
  };

  // Function to handle heart icon click
  const handleHeartClick = (id) => {
    console.log("Heart clicked for:", id);
    // Add your wishlist toggle logic here
  };

  return (
    <>
      <div
        className="custom-profile-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="custom-profile-overlay">
          <div className="custom-avatar">
            <span>S</span>
            <div className="custom-avatar-plus">
              <FaPlus size={10} />
            </div>
          </div>
          <div className="custom-profile-info">
            <h3 className="custom-profile-name">Sanket Sawant</h3>
            <a href="#" className="custom-profile-link">
              My Profile &gt;
            </a>
          </div>
        </div>
      </div>
      <div className="ecomm-profile-container">
        {/* Your Orders Section */}
        <div className="ecomm-section-wrapper">
          <div className="ecomm-section-header">
            <div className="ecomm-header-left">
              <div className="ecomm-cart-icon">
                <img src={your} alt="Cart" className="ecomm-icon-image" />
              </div>
              <div className="ecomm-header-text">
                <h2 className="ecomm-section-title">Your Orders</h2>
                <p className="ecomm-section-subtitle">
                  Check whole details of your order.
                </p>
              </div>
            </div>
            <div>
              <button className="ecomm-see-all-btn">See All</button>
            </div>
          </div>

          <div className="ecomm-items-row">
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

        {/* Buy Again Section */}
        <div className="ecomm-section-wrapper">
          <div className="ecomm-section-header">
            <div className="ecomm-header-left">
              <div className="ecomm-buy-icon">
                <img src={buy1} alt="Buy Again" className="ecomm-icon-image" />
              </div>
              <div className="ecomm-header-text">
                <h2 className="ecomm-section-title">Buy Again</h2>
                <p className="ecomm-section-subtitle">
                  Tap to view your order details.
                </p>
              </div>
            </div>
            <div>
              <button className="ecomm-see-all-btn">See All</button>
            </div>
          </div>

          <div className="ecomm-items-row">
            {buyAgainItems.map((item) => (
              <div key={item.id} className="ecomm-item-card">
                <div className="ecomm-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <h3 className="ecomm-item-title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Your Wishlist Section - Updated with products grid */}
        <div className="ecomm-section-wrapper">
          <div className="ecomm-section-header">
            <div className="ecomm-header-left">
              <div className="ecomm-wishlist-icon">
                <img
                  src={wishlist}
                  alt="Wishlist"
                  className="ecomm-icon-image"
                />{" "}
              </div>
              <div className="ecomm-header-text">
                <h2 className="ecomm-section-title">Your Wishlist</h2>
                <p className="ecomm-section-subtitle">
                  See Items in your wishlist.
                </p>
              </div>
            </div>
            <div>
              <button className="ecomm-see-all-btn">See All</button>
            </div>
          </div>

          {/* Products Grid (from CartPage.js) */}
          <div className="products-grid">
            {wishlistItems.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <button
                    className={`like-btn ${product.liked ? "liked" : ""}`}
                    onClick={() => handleHeartClick(product.id)}
                  >
                    <FiHeart />
                  </button>
                </div>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">₹ {product.price.toFixed(1)}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <FiShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Menu Section - NEW */}
        <div className="ecomm-section-wrapper">
          <div className="account-menu-container">
            {accountMenuItems.map((item) => (
              <div
                key={item.id}
                className="account-menu-item"
                onClick={item.onClick}
              >
                <div className="account-menu-left">
                  <div className="account-menu-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <div className="account-menu-text">
                    <h3 className="account-menu-title">{item.title}</h3>
                    <p className="account-menu-subtitle">{item.subtitle}</p>
                  </div>
                </div>
                <div className="account-menu-arrow">
                  <FiChevronRight size={20} color="#999" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
