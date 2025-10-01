import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineWork, MdOutlineSchool, MdOutlineLocationOn } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import './AddressesPage.css';

const AddressesPage = ({ onAddressSelect, onClose, fromCart = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if came from profile via route state
  const fromProfile = location.state?.fromProfile || false;

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState('Home');
  const [addressForm, setAddressForm] = useState({
    houseNumber: '',
    floor: '',
    tower: '',
    landmark: '',
    city: '',
    state: '',
    name: '',
    phone: ''
  });

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      icon: IoHomeOutline,
      address: 'Bb, Floor 2, Vastu Vihar KHI Apartment, Sector 16, Kharghar, Navi Mumbai, Maharashtra',
      name: 'John Doe',
      phone: '7738470926',
      houseNumber: 'Bb',
      floor: '2',
      tower: 'Vastu Vihar KHI Apartment',
      landmark: 'Sector 16',
      city: 'Navi Mumbai',
      state: 'Maharashtra'
    },
    {
      id: 2,
      type: 'Work',
      icon: MdOutlineWork,
      address: 'Office 501, Business Center, CBD Belapur, Navi Mumbai, Maharashtra',
      name: 'Jane Smith',
      phone: '9876543210',
      houseNumber: 'Office 501',
      floor: '',
      tower: 'Business Center',
      landmark: 'CBD Belapur',
      city: 'Navi Mumbai',
      state: 'Maharashtra'
    }
  ]);

  const addressTypes = [
    { type: 'Home', icon: IoHomeOutline },
    { type: 'Work', icon: MdOutlineWork },
    { type: 'School', icon: MdOutlineSchool },
    { type: 'Other', icon: MdOutlineLocationOn }
  ];

  // Handle back button click
  const handleBackButtonClick = () => {
    if (fromCart && onClose) {
      // If opened from cart as bottom sheet, use the onClose function
      onClose();
    } else if (fromProfile) {
      // If opened from profile page, go back to previous page
      navigate(-1);
    } else {
      // Default fallback - go to profile page
      navigate('/profile');
    }
  };

  // Handle modal overlay click (outside click)
  const handleOverlayClick = () => {
    if (fromCart && onClose) {
      // Only close on overlay click when in bottom sheet mode
      onClose();
    }
    // If not from cart (full page mode), don't close on overlay click
  };

  const handleInputChange = (field, value) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const openAddressModal = (address = null) => {
    if (address) {
      // Editing existing address
      setIsEditing(true);
      setEditingAddressId(address.id);
      setSelectedAddressType(address.type);
      setAddressForm({
        houseNumber: address.houseNumber || '',
        floor: address.floor || '',
        tower: address.tower || '',
        landmark: address.landmark || '',
        city: address.city || '',
        state: address.state || '',
        name: address.name || '',
        phone: address.phone || ''
      });
    } else {
      // Adding new address
      setIsEditing(false);
      setEditingAddressId(null);
      setSelectedAddressType('Home');
      setAddressForm({
        houseNumber: '',
        floor: '',
        tower: '',
        landmark: '',
        city: '',
        state: '',
        name: '',
        phone: ''
      });
    }
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleSaveAddress = () => {
    // Validate required fields
    if (!addressForm.houseNumber || !addressForm.city || !addressForm.state || 
        !addressForm.name || !addressForm.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Create the address string from form data
    const addressParts = [
      addressForm.houseNumber,
      addressForm.floor && `Floor ${addressForm.floor}`,
      addressForm.tower,
      addressForm.landmark,
      addressForm.city,
      addressForm.state
    ].filter(part => part && part.trim() !== '');

    const addressString = addressParts.join(', ');
    
    // Get the appropriate icon for the address type
    const addressTypeInfo = addressTypes.find(type => type.type === selectedAddressType);
    
    if (isEditing && editingAddressId) {
      // Update existing address
      setSavedAddresses(prev => 
        prev.map(address => 
          address.id === editingAddressId 
            ? {
                ...address,
                type: selectedAddressType,
                icon: addressTypeInfo.icon,
                address: addressString,
                name: addressForm.name,
                phone: addressForm.phone,
                houseNumber: addressForm.houseNumber,
                floor: addressForm.floor,
                tower: addressForm.tower,
                landmark: addressForm.landmark,
                city: addressForm.city,
                state: addressForm.state
              }
            : address
        )
      );
    } else {
      // Add new address
      const newAddress = {
        id: Math.max(0, ...savedAddresses.map(a => a.id)) + 1, // Generate a new ID
        type: selectedAddressType,
        icon: addressTypeInfo.icon,
        address: addressString,
        name: addressForm.name,
        phone: addressForm.phone,
        houseNumber: addressForm.houseNumber,
        floor: addressForm.floor,
        tower: addressForm.tower,
        landmark: addressForm.landmark,
        city: addressForm.city,
        state: addressForm.state
      };
      
      setSavedAddresses(prev => [...prev, newAddress]);
    }
    
    closeAddressModal();
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setSavedAddresses(prev => prev.filter(address => address.id !== id));
    }
  };

  // Handle address selection (when used from cart)
  const handleAddressSelection = (address) => {
    if (onAddressSelect) {
      onAddressSelect(address);
    }
  };

  return (
    <div className={`ultra_unique_addresses_container ${fromCart ? 'addresses-bottom-sheet-mode' : 'addresses-full-page-mode'}`}>
      {/* Header */}
      <div className="ultra_unique_header_section">
        <button 
          className="ultra_unique_back_button"
          onClick={handleBackButtonClick}
        >
          <IoIosArrowBack className="ultra_unique_back_arrow_icon" />
        </button>
        <h1 className="ultra_unique_page_title">Your Addresses</h1>
      </div>

      {/* Content Wrapper */}
      <div className="ultra_unique_content_wrapper">
        {/* Select delivery location */}
        <div className="ultra_unique_delivery_section">
          <h2 className="ultra_unique_delivery_title">Select delivery location</h2>
          
          {/* Add new address button */}
          <button 
            className="ultra_unique_add_address_button"
            onClick={() => openAddressModal()}
          >
            <span className="ultra_unique_plus_icon">+</span>
            <span className="ultra_unique_add_text">Add new address</span>
          </button>
        </div>

        {/* Your saved addresses */}
        <div className="ultra_unique_saved_section">
          <h3 className="ultra_unique_saved_title">Your saved addresses</h3>
          
          <div className="ultra_unique_addresses_list">
            {savedAddresses.map((address) => {
              const IconComponent = address.icon;
              return (
                <div 
                  key={address.id} 
                  className="ultra_unique_address_card"
                  onClick={() => fromCart && handleAddressSelection(address)} // Make clickable when from cart
                  style={{ 
                    cursor: fromCart ? 'pointer' : 'default',
                    backgroundColor: fromCart ? '#f9f9f9' : 'white'
                  }}
                >
                  <div className="ultra_unique_address_header">
                    <div className="ultra_unique_address_type_info">
                      <IconComponent className="ultra_unique_address_type_icon" />
                      <span className="ultra_unique_address_type_label">{address.type}</span>
                    </div>
                    <div className="ultra_unique_action_buttons">
                      <button 
                        className="ultra_unique_edit_button"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering address selection
                          openAddressModal(address);
                        }}
                      >
                        <FiEdit3 className="ultra_unique_edit_icon" />
                      </button>
                      <button 
                        className="ultra_unique_delete_button"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering address selection
                          handleDeleteAddress(address.id);
                        }}
                      >
                        <RiDeleteBin6Line className="ultra_unique_delete_icon" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="ultra_unique_address_details">
                    <p className="ultra_unique_address_text">{address.address}</p>
                    <p className="ultra_unique_contact_info">Name: {address.name}</p>
                    <p className="ultra_unique_contact_info">Phone number: {address.phone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Modal */}
      {isAddressModalOpen && (
        <div 
          className="ultra_unique_modal_overlay" 
          onClick={fromCart ? handleOverlayClick : closeAddressModal}
        >
          <div className="ultra_unique_modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="ultra_unique_modal_header">
              <h2 className="ultra_unique_modal_title">
                {isEditing ? 'Edit address details' : 'Add more address details'}
              </h2>
              <button 
                className="ultra_unique_close_button"
                onClick={closeAddressModal}
              >
                <IoClose className="ultra_unique_close_icon" />
              </button>
            </div>

            <div className="ultra_unique_modal_body">
              {/* Address Type Selection */}
              <div className="ultra_unique_address_type_section">
                <p className="ultra_unique_section_label">Save address as</p>
                <div className="ultra_unique_type_buttons">
                  {addressTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.type}
                        className={`ultra_unique_type_button ${
                          selectedAddressType === type.type ? 'ultra_unique_type_selected' : ''
                        }`}
                        onClick={() => setSelectedAddressType(type.type)}
                      >
                        <IconComponent className="ultra_unique_type_button_icon" />
                        <span className="ultra_unique_type_button_text">{type.type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Fields */}
              <div className="ultra_unique_form_section">
                <div className="ultra_unique_input_group">
                  <input
                    type="text"
                    placeholder="House Number"
                    className="ultra_unique_input_field"
                    value={addressForm.houseNumber}
                    onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                  />
                </div>

                <div className="ultra_unique_input_group">
                  <input
                    type="text"
                    placeholder="Floor *"
                    className="ultra_unique_input_field ultra_unique_required_field"
                    value={addressForm.floor}
                    onChange={(e) => handleInputChange('floor', e.target.value)}
                  />
                </div>

                <div className="ultra_unique_input_group">
                  <input
                    type="text"
                    placeholder="Tower / Block (optional)"
                    className="ultra_unique_input_field"
                    value={addressForm.tower}
                    onChange={(e) => handleInputChange('tower', e.target.value)}
                  />
                </div>

                <div className="ultra_unique_input_group">
                  <input
                    type="text"
                    placeholder="Landmark (optional)"
                    className="ultra_unique_input_field"
                    value={addressForm.landmark}
                    onChange={(e) => handleInputChange('landmark', e.target.value)}
                  />
                </div>

                <div className="ultra_unique_input_group">
                  <input
                    type="text"
                    placeholder="City *"
                    className="ultra_unique_input_field ultra_unique_required_field"
                    value={addressForm.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>

                <div className="ultra_unique_input_group">
                  <input
                    type="text"
                    placeholder="State *"
                    className="ultra_unique_input_field ultra_unique_required_field"
                    value={addressForm.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>

                <div className="ultra_unique_input_group">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="ultra_unique_input_field ultra_unique_required_field"
                    value={addressForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="ultra_unique_input_group">
                  <input
                    type="tel"
                    placeholder="Your Phone Number *"
                    className="ultra_unique_input_field ultra_unique_required_field"
                    value={addressForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="ultra_unique_modal_footer">
              <button 
                className="ultra_unique_save_button"
                onClick={handleSaveAddress}
              >
                {isEditing ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressesPage;