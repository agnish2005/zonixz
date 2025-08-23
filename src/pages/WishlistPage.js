import React, { useState } from 'react';
import { FiHeart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { GoFilter } from "react-icons/go";
import { IoIosStar } from "react-icons/io";
import './WishlistPage.css';
import tag from '../assets/Image/tag.png';
import Filter from './Filter'; 

const WishlistPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set([1, 2, 3, 4]));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const products = [
    {
      id: 1,
      title: "Ambuja Cement ",
      sku: "CMT-001-PRE",
      rating: 5.0,
      price: 520.0,
      mrp: 670.0,
      discount: "10.0% Off",
      emi: "₹1234.0/month",
      warranty: "33.0-Month Warranty Available",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      isTopPurchase: true
    },
    {
      id: 2,
      title: "Ambuja Cement",
      sku: "CMT-001-PRE",
      rating: 5.0,
      price: 520.0,
      mrp: 670.0,
      discount: "12.0% Off",
      emi: "₹1221.0/month",
      warranty: "33.0-Month Warranty Available",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      isTopPurchase: true
    },
    {
      id: 3,
      title: "Ambuja Cement",
      sku: "CMT-001-PRE",
      rating: 5.0,
      price: 520.0,
      mrp: 670.0,
      discount: "10.0% Off",
      emi: "₹1234.0/month",
      warranty: "33.0-Month Warranty Available",
      image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=300&fit=crop",
      isTopPurchase: true
    },
    {
      id: 4,
      title: "Ambuja Cement",
      sku: "CMT-001-PRE",
      rating: 5.0,
      price: 520.0,
      mrp: 670.0,
      discount: "12.0% Off",
      emi: "₹1221.0/month",
      warranty: "33.0-Month Warranty Available",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      isTopPurchase: true
    }
  ];

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
    // Prevent body scrolling when filter is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
    // Re-enable body scrolling when filter is closed
    document.body.style.overflow = 'auto';
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    handleCloseFilter();
    // Here you would typically filter your products based on the selected filters
    console.log('Applied filters:', filters);
  };

  return (
    <div className="ultra_wishlist_container_supreme">
      {/* Search Header */}
      <div className="ultra_search_header_magnificent">
        <div className="ultra_search_wrapper_fantastic">
          <IoSearchOutline className="ultra_search_icon_brilliant" size={20} />
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ultra_search_input_extraordinary"
          />
        </div>
        <div 
          className="ultra_filter_button_spectacular"
          onClick={handleOpenFilter}
          style={{ cursor: 'pointer' }} // Add cursor pointer for better UX
        >
          <span>Filter</span>
          <GoFilter size={16} className="ultra_filter_icon_amazing" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="ultra_products_grid_phenomenal">
        {products.map((product) => (
          <div key={product.id} className="ultra_product_card_incredible">
            {/* Product Image Container */}
            <div className="ultra_image_container_outstanding">
              {product.isTopPurchase && (
                <div className="ultra_top_purchase_badge_exceptional">
                  Top Purchase Product
                </div>
              )}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="ultra_favorite_button_marvelous"
              >
                <FiHeart
                  size={20}
                  className={`ultra_heart_icon_wonderful ${
                    favorites.has(product.id) ? 'ultra_heart_filled_glorious' : ''
                  }`}
                  fill={favorites.has(product.id) ? '#ef4444' : 'none'}
                />
              </button>
              <img
                src={product.image}
                alt={product.title}
                className="ultra_product_image_sublime"
              />
              
              {/* Image Pagination Dots */}
              <div className="ultra_pagination_dots_magnificent">
                <div className="ultra_dot_active_brilliant"></div>
                <div className="ultra_dot_inactive_splendid"></div>
                <div className="ultra_dot_inactive_splendid"></div>
                <div className="ultra_dot_inactive_splendid"></div>
              </div>
            </div>

            {/* Product Info */}
            <div className="ultra_product_info_extraordinary">
              <h3 className="ultra_product_title_fantastic">{product.title}</h3>
              <p className="ultra_product_sku_amazing">SKU: {product.sku}</p>
              
              {/* Rating */}
              <div className="ultra_rating_container_spectacular">
                <span className="ultra_rating_number_incredible">{product.rating}</span>
                <div className="ultra_stars_wrapper_outstanding">
                  {[...Array(5)].map((_, i) => (
                    <IoIosStar
                      key={i}
                      size={14}
                      className="ultra_star_icon_phenomenal"
                    />
                  ))}
                </div>
                <div className="ultra_assurance_badge_marvelous">
                  <img 
                    src={tag} 
                    alt="Assured" 
                    className="ultra_assurance_image_icon"
                  />
                </div>
              </div>

              {/* Warranty */}
              <p className="ultra_warranty_text_wonderful">{product.warranty}</p>

              {/* Pricing */}
              <div className="ultra_pricing_container_glorious">
                <div className="ultra_price_wrapper_sublime">
                  <span className="ultra_currency_symbol_brilliant">₹</span>
                  <span className="ultra_price_amount_magnificent">{product.price}</span>
                  <span className="ultra_mrp_price_fantastic">MRP ₹{product.mrp}</span>
                </div>
              </div>
              <div className="ultra_discount_badge_extraordinary">
                ({product.discount})
              </div>

              {/* EMI Info */}
              <p className="ultra_emi_text_spectacular">EMI starting from {product.emi}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Modal */}
      <Filter 
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default WishlistPage;