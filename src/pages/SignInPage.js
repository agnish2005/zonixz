import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGoogle, FaApple, FaFacebook, FaChevronDown } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { MdClose } from "react-icons/md";
import './SignInPage.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [showCountryPopup, setShowCountryPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    code: "IN",
    dial_code: "+91",
    flag: "🇮🇳"
  });

  const countries = [
    { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
    { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" },
    { name: "Canada", code: "CA", dial_code: "+1", flag: "🇨🇦" },
    { name: "Australia", code: "AU", dial_code: "+61", flag: "🇦🇺" },
    { name: "Germany", code: "DE", dial_code: "+49", flag: "🇩🇪" },
    { name: "France", code: "FR", dial_code: "+33", flag: "🇫🇷" },
    { name: "Japan", code: "JP", dial_code: "+81", flag: "🇯🇵" },
    { name: "Brazil", code: "BR", dial_code: "+55", flag: "🇧🇷" },
    { name: "China", code: "CN", dial_code: "+86", flag: "🇨🇳" },
    { name: "Russia", code: "RU", dial_code: "+7", flag: "🇷🇺" },
    { name: "South Africa", code: "ZA", dial_code: "+27", flag: "🇿🇦" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data:', formData);
  };

  const handleSocialLogin = (provider) => {
    // Handle social login logic here
    console.log(`Login with ${provider}`);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryPopup(false);
  };

  return (
    <div className="signin-page-container">
      {/* Header with Back Button */}
      <div className="signin-header">
        <button 
          className="back-button-signin"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack size={25} />
        </button>
      </div>
      
      {/* Country Code Popup */}
      {showCountryPopup && (
        <div className="signin-country-popup-overlay">
          <div className="signin-country-popup">
            <div className="signin-popup-header">
              <h3>Select Country</h3>
              <MdClose 
                className="signin-popup-close" 
                onClick={() => setShowCountryPopup(false)} 
              />
            </div>
            <div className="signin-country-list">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className={`signin-country-item ${
                    selectedCountry.code === country.code ? "selected" : ""
                  }`}
                  onClick={() => handleCountrySelect(country)}
                >
                  <span className="signin-country-flag">{country.flag}</span>
                  <span className="signin-country-name">{country.name}</span>
                  <span className="signin-country-code">
                    {country.dial_code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="signin-content">
        {/* Title Section */}
        <div className="signin-title-section">
          <h1 className="signin-main-title">Create your Account</h1>
          <p className="signin-subtitle">Enter your details to get started.</p>
        </div>

        {/* Form Section */}
        <form className="signin-form" onSubmit={handleSubmit}>
          {/* Name Fields Row */}
          <div className="signin-name-row">
            <div className="signin-input-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="signin-input-field"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="signin-input-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="signin-input-field"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="signin-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="signin-input-field signin-full-width"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Phone Number Field with Country Code Selector */}
          <div className="signin-phone-group">
            <div 
              className="signin-country-code-selector"
              onClick={() => setShowCountryPopup(true)}
            >
              <span className="signin-country-flag">
                {selectedCountry.flag}
              </span>
              <span>{selectedCountry.dial_code}</span>
              <FaChevronDown className="signin-chevron-down" />
            </div>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="signin-phone-input"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Continue Button */}
          <button type="submit" className="signin-continue-btn">
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="signin-divider">
          <span className="signin-divider-text">OR</span>
        </div>

        {/* Social Login Buttons */}
        <div className="signin-social-section">
          <button 
            className="signin-social-btn signin-google-btn"
            onClick={() => handleSocialLogin('Google')}
          >
            <FaGoogle className="signin-social-icon" />
            Continue with Google
          </button>

          <button 
            className="signin-social-btn signin-apple-btn"
            onClick={() => handleSocialLogin('Apple')}
          >
            <FaApple className="signin-social-icon" />
            Continue with Apple
          </button>

          <button 
            className="signin-social-btn signin-facebook-btn"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <FaFacebook className="signin-social-icon" />
            Continue with Facebook
          </button>
        </div>

        {/* Sign In Link */}
        <div className="signin-footer">
          <span className="signin-footer-text">
            Already have an account? 
            <span 
              className="signin-link"
              onClick={() => navigate('/account/login')}
            >
              Sign In
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;