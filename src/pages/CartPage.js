import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CartPage.css";
import pa from "../assets/Image/pa.png";
import pb from "../assets/Image/pb.png";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { MdHomeFilled } from "react-icons/md";
import AddressesPage from "./AddressesPage"; // Import the full addresses page

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bisleri Packaged Water",
      size: "5 ltr",
      price: 75,
      quantity: 1,
      image: pa,
      wishlist: false,
    },
    {
      id: 2,
      name: "Cadbury Oreo Vanilla Flavour Sandwich Cream ...",
      size: "125.25 g",
      price: 44,
      originalPrice: 45,
      quantity: 1,
      image: pb,
      wishlist: false,
    },
    {
      id: 3,
      name: "Hide & Seek Chocolate Chip Cookies (100 g)",
      size: "100 g",
      price: 30,
      quantity: 1,
      image: pa,
      wishlist: false,
    },
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [similarProducts] = useState([
    {
      id: 4,
      name: "Stylish Headphones X200",
      price: 100.0,
      image: pb,
      liked: false,
    },
    {
      id: 5,
      name: "Ergonomic Gaming Mouse",
      price: 45.5,
      image: pa,
      liked: false,
    },
    {
      id: 6,
      name: "Stylish Headphones X200",
      price: 100.0,
      image: pb,
      liked: false,
    },
    {
      id: 7,
      name: "Ergonomic Gaming Mouse",
      price: 45.5,
      image: pa,
      liked: false,
    },
    {
      id: 8,
      name: "Stylish Headphones X200",
      price: 100.0,
      image: pb,
      liked: false,
    },
  ]);

  // State for addresses page as bottom sheet
  const [showAddressesPage, setShowAddressesPage] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    type: "Home",
    address: "Sanket Sawant, FLAT NO. 401, KHI - 25 Vastup...",
    name: "Sanket Sawant",
    phone: "7738470926",
  });

  useEffect(() => {
    if (location.state?.appliedCoupon) {
      setAppliedCoupon(location.state.appliedCoupon);
    }

    // Check if we're returning from addresses page with a selected address
    if (location.state?.selectedAddress) {
      setDeliveryAddress(location.state.selectedAddress);
      setShowAddressesPage(false);
    }
  }, [location.state]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const moveToWishlist = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleLike = (id) => {
    console.log("Toggle like for product:", id);
  };

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          wishlist: false,
        },
      ]);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = (coupon) => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (coupon.type === "percentage") {
      const discountAmount = (subtotal * coupon.value) / 100;
      return coupon.maxDiscount
        ? Math.min(discountAmount, coupon.maxDiscount)
        : discountAmount;
    } else {
      return coupon.value;
    }
  };

  // Address functions
  const handleChangeAddress = () => {
    setShowAddressesPage(true);
  };

  const handleCloseAddressesPage = () => {
    setShowAddressesPage(false);
  };

  const handleAddressSelect = (address) => {
    setDeliveryAddress({
      type: address.type,
      address: address.address,
      name: address.name,
      phone: address.phone,
    });
    setShowAddressesPage(false);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = appliedCoupon
    ? parseFloat(calculateDiscount(appliedCoupon))
    : 0;
  const total = subtotal + 20 - discount;

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page">
        {/* Coupon Section */}
        <div
          className="coupon-section"
          onClick={() => navigate("/coupons", { state: { fromCart: true } })}
          style={{ cursor: "pointer" }}
        >
          <div className="coupon-content">
            <div className="coupon-icon">🏷️</div>
            <div className="coupon-text">
              {appliedCoupon ? (
                <>
                  <h3>Applied: {appliedCoupon.code}</h3>
                  <p>Save ₹{calculateDiscount(appliedCoupon).toFixed(2)}</p>
                </>
              ) : (
                <>
                  <h3>Apply Coupon</h3>
                  <p>View more</p>
                </>
              )}
            </div>
          </div>
          <div className="coupon-arrow">›</div>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-size">{item.size}</p>
                <button
                  className="wishlist-btn"
                  onClick={() => moveToWishlist(item.id)}
                >
                  Move to wishlist
                </button>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="price-section">
                  {item.originalPrice && (
                    <span className="original-price">
                      ₹{item.originalPrice}
                    </span>
                  )}
                  <span className="current-price">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Similar Products */}
        <div className="similar-products">
          <h3 className="section-title">Similar Products</h3>
          <div className="products-grid" style={{ gap: "0px" }}>
            {similarProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{ border: "none" }}
              >
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

        {/* Order Summary */}
        <div className="order-summary">
          <h3 className="order-summary-title">Order Summary</h3>
          <div className="order-summary-content">
            <div className="summary-row">
              <p className="summary-label">
                Subtotal
                <span className="info-icon">?</span>
              </p>
              <p className="summary-value">₹{subtotal.toFixed(2)}</p>
            </div>

            {appliedCoupon && (
              <div className="summary-row">
                <p className="summary-label">
                  Discount ({appliedCoupon.code})
                  <span className="info-icon">?</span>
                </p>
                <p className="summary-value" style={{ color: "green" }}>
                  -₹{calculateDiscount(appliedCoupon).toFixed(2)}
                </p>
              </div>
            )}

            <div className="summary-row">
              <p className="summary-label">
                Delivery Fee
                <span className="info-icon">?</span>
              </p>
              <p className="summary-value">₹ 20.00</p>
            </div>

            <div className="summary-row total-row">
              <p className="summary-label">Total</p>
              <p className="summary-value">₹ {total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Section */}
        <div className="sticky-bottom">
          <div className="delivery-info">
            <div className="delivery-content">
              <div className="home-icon">
                <MdHomeFilled />
              </div>
              <div className="delivery-text">
                <h4>Delivering to {deliveryAddress.type}</h4>
                <p>
                  {deliveryAddress.name}, {deliveryAddress.address}
                </p>
              </div>
            </div>
            <button className="change-btn" onClick={handleChangeAddress}>
              Change
            </button>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>

      {/* Addresses Page as Bottom Sheet */}
      {showAddressesPage && (
        <div className="addresses-bottom-sheet">
          <div className="addresses-sheet-content">
            <AddressesPage
              onAddressSelect={handleAddressSelect}
              onClose={handleCloseAddressesPage}
              fromCart={true} // Add this prop to indicate it's opened from cart
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;