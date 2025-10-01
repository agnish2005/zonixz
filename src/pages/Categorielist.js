import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Drawer,
  Modal,
  Box,
  Divider,
  Button,
  Slider,
  TextField,
  Checkbox,
  Radio,
} from "@mui/material";
import { FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { IoIosArrowBack, IoIosStar, IoIosArrowForward } from "react-icons/io";
import { MdExpandMore, MdExpandLess, MdSort } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import "./Categorielist.css";
import tag from "../assets/Image/tag.png";
import marble1 from "../assets/Image/marble1.webp";
import brand1 from "../assets/Image/brand1.png";
import brand2 from "../assets/Image/brand2.png";
import brand3 from "../assets/Image/brand3.png";

const Categorielist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subcategoryName = location.state?.subcategoryName || "Ani";
  const [favorites, setFavorites] = useState(new Set([1, 2, 3, 4]));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("relevance");

  // Enhanced filter state
  const [selectedFilters, setSelectedFilters] = useState({
    zonixzzAssured: "",
    brand: [],
    priceRange: [0, 30000],
    collections: [],
    discount: [],
  });

  // Accordion expansion state
  const [expandedSections, setExpandedSections] = useState({
    zonixzzAssured: true,
    brand: false,
    price: true,
    collections: false,
    discount: false,
  });

  // Product images array
  const productImages = [marble1, brand1, brand2, brand3];

  // State for current image index for each product
  const [currentImageIndices, setCurrentImageIndices] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  // Touch event refs for each product
  const touchStartX = useRef({});
  const touchEndX = useRef({});

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
      images: productImages,
      isTopPurchase: true,
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
      images: productImages,
      isTopPurchase: true,
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
      images: productImages,
      isTopPurchase: true,
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
      images: productImages,
      isTopPurchase: true,
    },
  ];

  // Updated sort options to match the image
  const sortOptions = [
    { value: "highest-price", label: "Highest Priced First" },
    { value: "lowest-price", label: "Lowest Priced First" },
    { value: "fastest-shipping", label: "Fastest Shipping" },
    { value: "newest", label: "Newest" },
    { value: "customer-rating", label: "Customer Rating" },
  ];

  // Enhanced filter options
  const filterOptions = {
    zonixzzAssured: [
      { label: "Yes", value: "yes", count: 1313 },
      { label: "No", value: "no", count: 24 },
    ],
    brand: ["Ambuja", "UltraTech", "ACC", "Birla", "JSW", "Shree"],
    collections: ["Premium", "Economy", "Super Saver", "Best Seller"],
    discount: [
      "10% and above",
      "20% and above",
      "30% and above",
      "40% and above",
      "50% and above",
    ],
  };

  // Touch event handlers for image swiping
  const handleTouchStart = (productId, e) => {
    touchStartX.current[productId] = e.touches[0].clientX;
  };

  const handleTouchMove = (productId, e) => {
    touchEndX.current[productId] = e.touches[0].clientX;
  };

  const handleTouchEnd = (productId) => {
    if (!touchStartX.current[productId] || !touchEndX.current[productId])
      return;

    const diff = touchStartX.current[productId] - touchEndX.current[productId];
    const minSwipeDistance = 50; // Minimum distance for a swipe

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe left - next image
        nextImage(productId);
      } else {
        // Swipe right - previous image
        prevImage(productId);
      }
    }

    // Reset touch positions
    touchStartX.current[productId] = null;
    touchEndX.current[productId] = null;
  };

  const nextImage = (productId) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % productImages.length,
    }));
  };

  const prevImage = (productId) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]:
        prev[productId] === 0 ? productImages.length - 1 : prev[productId] - 1,
    }));
  };

  const goToImage = (productId, index) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleFilterOpen = () => setIsFilterOpen(true);
  const handleFilterClose = () => setIsFilterOpen(false);

  const handleSortOpen = () => setIsSortOpen(true);
  const handleSortClose = () => setIsSortOpen(false);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleAccordionToggle = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (filterType, value) => {
    if (
      filterType === "brand" ||
      filterType === "collections" ||
      filterType === "discount"
    ) {
      const currentArray = selectedFilters[filterType];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      setSelectedFilters({
        ...selectedFilters,
        [filterType]: newArray,
      });
    } else if (filterType === "priceRange") {
      setSelectedFilters({
        ...selectedFilters,
        priceRange: value,
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [filterType]: value,
      });
    }
  };

  const applyFilters = () => {
    console.log("Applied filters:", selectedFilters);
    handleFilterClose();
  };

  const clearFilters = () => {
    setSelectedFilters({
      zonixzzAssured: "",
      brand: [],
      priceRange: [0, 30000],
      collections: [],
      discount: [],
    });
  };

  const applySort = () => {
    console.log("Applied sort:", selectedSort);
    handleSortClose();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilters.zonixzzAssured) count++;
    count += selectedFilters.brand.length;
    if (
      selectedFilters.priceRange[0] !== 0 ||
      selectedFilters.priceRange[1] !== 30000
    )
      count++;
    count += selectedFilters.collections.length;
    count += selectedFilters.discount.length;
    return count;
  };

  const handleProductClick = (product) => {
    navigate("/details", { state: { product } });
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="fixed" className="app-bar1">
        <Toolbar className="app-toolbar1">
          <IconButton
            edge="start"
            className="menu-button"
            onClick={() => window.history.back()}
          >
            <IoIosArrowBack size={26} />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            style={{ flexGrow: 1, textAlign: "center", fontSize: "16px" }}
          >
            {subcategoryName}
          </Typography>

          <div className="action-icons">
            <IconButton className="icon-button">
              <Badge color="error" className="badge">
                <FiHeart size={24} />
              </Badge>
            </IconButton>
            <IconButton className="icon-button">
              <Badge color="error" className="badge">
                <FiShoppingCart size={24} />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <div style={{ marginTop: "25px" }}>
        <div className="div-top">
          {/* Delivery Address Section */}
          <div className="dlv-header-section">
            <h2 className="dlv-header-title">Delivering to Home</h2>
            <p className="dlv-header-address">
              Sanket Sawant, FLAT NO. 401, KHI - 25 Vastup...
            </p>
            <IoIosArrowForward className="dlv-header-arrow" />
          </div>

          {/* Sort and Filter Section */}
          <div className="dlv-controls-wrapper">
            <div className="dlv-sort-container" onClick={handleSortOpen}>
              <div className="dlv-sort-text-content">
                <div className="div-06">
                  <MdSort size={20} className="dlv-sort-icon" />
                  <span className="dlv-sort-main-label">Sort By</span>
                </div>
                <span className="dlv-sort-selected-value">
                  {sortOptions.find((opt) => opt.value === selectedSort)
                    ?.label || "Relevance"}
                </span>
              </div>
            </div>

            <div className="dlv-vertical-divider"></div>

            <div className="dlv-filter-container" onClick={handleFilterOpen}>
              <div className="dlv-filter-text-content">
                <div className="div-06">
                  <IoFilterSharp size={18} className="dlv-filter-icon" />
                  <span className="dlv-filter-main-label">Filter</span>
                </div>
                <span className="dlv-filter-selected-count">
                  {getActiveFilterCount()} Filter Selected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Sidebar */}
        <Drawer
          anchor="right"
          open={isFilterOpen}
          onClose={handleFilterClose}
          sx={{
            "& .MuiDrawer-paper": {
              width: "90%",
              maxWidth: "400px",
            },
          }}
        >
          <Box className="filter-drawer-container">
            <div className="filter-header">
              <Typography variant="h5" className="filter-title">
                Apply Filters
              </Typography>
              <IconButton
                onClick={handleFilterClose}
                className="filter-close-btn"
              >
                <FiX size={24} />
              </IconButton>
            </div>

            <Divider className="filter-main-divider" />

            <div className="filter-content">
              {/* zonixzz Assured Filter */}
              <div className="filter-section">
                <div
                  className="filter-section-header"
                  onClick={() => handleAccordionToggle("zonixzzAssured")}
                >
                  <span className="filter-section-title">zonixzz Assured</span>
                  {expandedSections.zonixzzAssured ? (
                    <MdExpandLess size={24} />
                  ) : (
                    <MdExpandMore size={24} />
                  )}
                </div>

                {expandedSections.zonixzzAssured && (
                  <div className="filter-section-content-expanded">
                    {filterOptions.zonixzzAssured.map((option) => (
                      <div
                        key={option.value}
                        className="filter-checkbox-item-assured"
                      >
                        <Checkbox
                          checked={
                            selectedFilters.zonixzzAssured === option.value
                          }
                          onChange={() =>
                            handleFilterChange("zonixzzAssured", option.value)
                          }
                          className="filter-checkbox"
                          sx={{
                            color: "#d1d5db",
                            "&.Mui-checked": {
                              color: "#f59e0b",
                            },
                          }}
                        />
                        <span className="filter-option-label">
                          {option.label}
                        </span>
                        <span className="filter-option-count">
                          ({option.count})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Brand Filter */}
              <div className="filter-section">
                <div
                  className="filter-section-header"
                  onClick={() => handleAccordionToggle("brand")}
                >
                  <span className="filter-section-title">Brand</span>
                  {expandedSections.brand ? (
                    <MdExpandLess size={24} />
                  ) : (
                    <MdExpandMore size={24} />
                  )}
                </div>

                {expandedSections.brand && (
                  <div className="filter-section-content">
                    {filterOptions.brand.map((brand) => (
                      <div key={brand} className="filter-checkbox-item">
                        <Checkbox
                          checked={selectedFilters.brand.includes(brand)}
                          onChange={() => handleFilterChange("brand", brand)}
                          className="filter-checkbox"
                          sx={{
                            color: "#d1d5db",
                            "&.Mui-checked": {
                              color: "#f59e0b",
                            },
                          }}
                        />
                        <span className="filter-option-label">{brand}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="filter-section">
                <div
                  className="filter-section-header"
                  onClick={() => handleAccordionToggle("price")}
                >
                  <span className="filter-section-title">Price</span>
                  {expandedSections.price ? (
                    <MdExpandLess size={24} />
                  ) : (
                    <MdExpandMore size={24} />
                  )}
                </div>

                {expandedSections.price && (
                  <div className="filter-section-content-expanded">
                    <div className="price-slider-container">
                      <Slider
                        value={selectedFilters.priceRange}
                        onChange={(e, newValue) =>
                          handleFilterChange("priceRange", newValue)
                        }
                        valueLabelDisplay="off"
                        min={0}
                        max={30000}
                        step={100}
                        className="price-slider"
                        sx={{
                          color: "#FFA500",
                          height: 8,
                          "& .MuiSlider-thumb": {
                            backgroundColor: "#FFA500",
                            width: 20,
                            height: 20,
                            border: "3px solid #ffffff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                            "&:hover": {
                              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                            },
                          },
                          "& .MuiSlider-track": {
                            backgroundColor: "#FFA500",
                            border: "none",
                          },
                          "& .MuiSlider-rail": {
                            backgroundColor: "#d1d5db",
                          },
                        }}
                      />
                      <div className="price-inputs">
                        <TextField
                          value={selectedFilters.priceRange[0]}
                          onChange={(e) => {
                            const newRange = [
                              parseInt(e.target.value) || 0,
                              selectedFilters.priceRange[1],
                            ];
                            handleFilterChange("priceRange", newRange);
                          }}
                          className="price-input"
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              backgroundColor: "#ffffff",
                              "& fieldset": {
                                borderColor: "#d1d5db",
                              },
                              "&:hover fieldset": {
                                borderColor: "#f59e0b",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#f59e0b",
                              },
                            },
                          }}
                        />
                        <TextField
                          value={selectedFilters.priceRange[1]}
                          onChange={(e) => {
                            const newRange = [
                              selectedFilters.priceRange[0],
                              parseInt(e.target.value) || 30000,
                            ];
                            handleFilterChange("priceRange", newRange);
                          }}
                          className="price-input"
                          variant="outlined"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              backgroundColor: "#ffffff",
                              "& fieldset": {
                                borderColor: "#d1d5db",
                              },
                              "&:hover fieldset": {
                                borderColor: "#f59e0b",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#f59e0b",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Collections Filter */}
              <div className="filter-section">
                <div
                  className="filter-section-header"
                  onClick={() => handleAccordionToggle("collections")}
                >
                  <span className="filter-section-title">Collections</span>
                  {expandedSections.collections ? (
                    <MdExpandLess size={24} />
                  ) : (
                    <MdExpandMore size={24} />
                  )}
                </div>

                {expandedSections.collections && (
                  <div className="filter-section-content">
                    {filterOptions.collections.map((collection) => (
                      <div key={collection} className="filter-checkbox-item">
                        <Checkbox
                          checked={selectedFilters.collections.includes(
                            collection
                          )}
                          onChange={() =>
                            handleFilterChange("collections", collection)
                          }
                          className="filter-checkbox"
                          sx={{
                            color: "#d1d5db",
                            "&.Mui-checked": {
                              color: "#f59e0b",
                            },
                          }}
                        />
                        <span className="filter-option-label">
                          {collection}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Discount Filter */}
              <div className="filter-section">
                <div
                  className="filter-section-header"
                  onClick={() => handleAccordionToggle("discount")}
                >
                  <span className="filter-section-title">Discount</span>
                  {expandedSections.discount ? (
                    <MdExpandLess size={24} />
                  ) : (
                    <MdExpandMore size={24} />
                  )}
                </div>

                {expandedSections.discount && (
                  <div className="filter-section-content">
                    {filterOptions.discount.map((discount) => (
                      <div key={discount} className="filter-checkbox-item">
                        <Checkbox
                          checked={selectedFilters.discount.includes(discount)}
                          onChange={() =>
                            handleFilterChange("discount", discount)
                          }
                          className="filter-checkbox"
                          sx={{
                            color: "#d1d5db",
                            "&.Mui-checked": {
                              color: "#f59e0b",
                            },
                          }}
                        />
                        <span className="filter-option-label">{discount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="filter-footer">
              <Button
                variant="outlined"
                onClick={clearFilters}
                className="clear-filters-btn"
              >
                Clear All
              </Button>
              <Button
                variant="contained"
                onClick={applyFilters}
                className="apply-filters-btn"
              >
                Apply
              </Button>
            </div>
          </Box>
        </Drawer>

        {/* Enhanced Sort Bottom Popup */}
        <Modal
          open={isSortOpen}
          onClose={handleSortClose}
          className="sort-modal"
        >
          <Box className="sort-modal-content">
            <div className="sort-header">
              <Typography variant="h5" className="sort-title">
                Sort by
              </Typography>
              <IconButton onClick={handleSortClose} className="sort-close-btn">
                <FiX size={24} />
              </IconButton>
            </div>

            <Divider className="sort-divider" />

            <div className="sort-options">
              {sortOptions.map((option) => (
                <div
                  key={option.value}
                  className={`sort-option ${
                    selectedSort === option.value ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort(option.value)}
                >
                  <Radio
                    checked={selectedSort === option.value}
                    value={option.value}
                    name="sort-options"
                    className="sort-radio"
                  />
                  <span className="sort-option-label">{option.label}</span>
                </div>
              ))}
            </div>
          </Box>
        </Modal>

        <div className="categorie_list_container">
          {/* Products Grid */}
          <div className="categorie_products_grid_exclusive">
            {products.map((product) => (
              <div
                key={product.id}
                className="categorie_product_card_premium"
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                {/* Product Image Container */}
                <div
                  className="categorie_image_container_elite"
                  onTouchStart={(e) => handleTouchStart(product.id, e)}
                  onTouchMove={(e) => handleTouchMove(product.id, e)}
                  onTouchEnd={() => handleTouchEnd(product.id)}
                >
                  {product.isTopPurchase && (
                    <div className="categorie_top_purchase_badge_premier">
                      Top Purchase Product
                    </div>
                  )}
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    className="categorie_favorite_button_select"
                  >
                    <FiHeart
                      size={20}
                      className={`categorie_heart_icon_prime ${
                        favorites.has(product.id)
                          ? "categorie_heart_filled_elite"
                          : ""
                      }`}
                      fill={favorites.has(product.id) ? "#ef4444" : "none"}
                    />
                  </button>
                  <img
                    src={product.images[currentImageIndices[product.id]]}
                    alt={product.title}
                    className="categorie_product_image_supreme"
                  />

                  {/* Image Pagination Dots */}
                  <div className="categorie_pagination_dots_exclusive">
                    {product.images.map((_, index) => (
                      <div
                        key={index}
                        className={
                          index === currentImageIndices[product.id]
                            ? "categorie_dot_active_premium"
                            : "categorie_dot_inactive_elite"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(product.id, index);
                        }}
                        style={{ cursor: "pointer" }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="categorie_product_info_premier">
                  <h3 className="categorie_product_title_select">
                    {product.title}
                  </h3>
                  <p className="categorie_product_sku_prime">
                    SKU: {product.sku}
                  </p>

                  {/* Rating */}
                  <div className="categorie_rating_container_elite">
                    <span className="categorie_rating_number_premium">
                      {product.rating}
                    </span>
                    <div className="categorie_stars_wrapper_exclusive">
                      {[...Array(5)].map((_, i) => (
                        <IoIosStar
                          key={i}
                          size={14}
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

                  {/* Warranty */}
                  <p className="categorie_warranty_text_select">
                    {product.warranty}
                  </p>

                  {/* Pricing */}
                  <div className="categorie_pricing_container_prime">
                    <div className="categorie_price_wrapper_elite">
                      <span className="categorie_currency_symbol_premium">
                        ₹
                      </span>
                      <span className="categorie_price_amount_exclusive">
                        {product.price}
                      </span>
                      <span className="categorie_mrp_price_supreme">
                        MRP ₹{product.mrp}
                      </span>
                    </div>
                  </div>
                  <div className="categorie_discount_badge_premier">
                    ({product.discount})
                  </div>

                  {/* EMI Info */}
                  <p className="categorie_emi_text_select">
                    EMI starting from {product.emi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categorielist;