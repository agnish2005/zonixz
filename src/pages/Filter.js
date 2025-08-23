import React, { useState, useEffect } from 'react';
import './Filter.css';

const Filter = ({ isOpen, onClose, onApplyFilters }) => {
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [selectedOrderDate, setSelectedOrderDate] = useState('');
  const [isMobileHeight, setIsMobileHeight] = useState(false);

  // Check if screen height is small (mobile)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileHeight(window.innerHeight <= 480);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const orderTypeOptions = [
    { id: 'orders', label: 'Orders' },
    { id: 'not-yet-shipped', label: 'Not Yet Shipped' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const orderDateOptions = [
    { id: 'last-30-days', label: 'Last 30 days' },
    { id: 'last-3-months', label: 'Last 3 months' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' },
    { id: '2020', label: '2020' }
  ];

  const handleOrderTypeChange = (optionId) => {
    setSelectedOrderType(optionId);
  };

  const handleOrderDateChange = (optionId) => {
    setSelectedOrderDate(optionId);
  };

  const handleApplyFilters = () => {
    const filters = {
      orderType: selectedOrderType,
      orderDate: selectedOrderDate
    };
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="zx9k_filter_modal_overlay">
      <div className="qw7r_filter_container">
        <div className="mn4t_filter_header">
          <h2 className="pl8e_filter_title">Filter Options</h2>
          <button className="hy6u_close_button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="vb3n_filter_section">
          <h3 className="kl9m_section_title">Filter by Order Type</h3>
          {orderTypeOptions.map((option) => (
            <div 
              key={option.id} 
              className="rt5w_filter_option"
              onClick={() => handleOrderTypeChange(option.id)}
            >
              <div className={`cx2y_radio_input ${selectedOrderType === option.id ? 'ju8i_checked' : ''}`}></div>
              <span className="gh4p_option_label">{option.label}</span>
            </div>
          ))}
        </div>

        <div className="vb3n_filter_section">
          <h3 className="kl9m_section_title">Filter by Order Date</h3>
          {orderDateOptions.map((option) => (
            <div 
              key={option.id} 
              className="rt5w_filter_option"
              onClick={() => handleOrderDateChange(option.id)}
            >
              <div className={`cx2y_radio_input ${selectedOrderDate === option.id ? 'ju8i_checked' : ''}`}></div>
              <span className="gh4p_option_label">{option.label}</span>
            </div>
          ))}
        </div>

        <button className="df7x_apply_button" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;