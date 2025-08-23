import React, { useState } from "react";
import {
  FaFlag,
  FaChevronDown,
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../assets/Image/logo2.png";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdOutlineSupportAgent, MdChat, MdBook, MdClose } from "react-icons/md";
import OTPVerificationPage from "./OTPVerificationPage"; // Import the OTP component
import "./CreateAccountPage.css";

const CreateAccountPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showCountryPopup, setShowCountryPopup] = useState(false);
  const [showOTPPage, setShowOTPPage] = useState(false); // New state for OTP page
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

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryPopup(false);
  };

  const handleSignIn = () => {
    if (phoneNumber.trim()) {
      // Validate phone number here if needed
      setShowOTPPage(true);
    } else {
      alert("Please enter a valid phone number");
    }
  };

  const handleBackFromOTP = () => {
    setShowOTPPage(false);
  };

  // Show OTP page if showOTPPage is true
  if (showOTPPage) {
    return (
      <OTPVerificationPage 
        onBack={handleBackFromOTP}
        phoneNumber={`${selectedCountry.dial_code} ${phoneNumber}`}
      />
    );
  }

  return (
    <div className="zonixz-main-container">
      {/* Header */}
      <div className="zonixz-header-wrapper">
        <IoIosArrowBack className="zonixz-back-arrow-icon" />
        <div className="zonixz-brand-logo">
          <img src={logo} alt="My Logo" className="zonixz-logo-image" />
          <span className="zonixz-brand-name">Zonixz</span>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="zonixz-welcome-wrapper">
        <h1 className="zonixz-welcome-heading">Welcome back!</h1>
        <h2 className="zonixz-features-subtitle">
          Get Exclusive access to new features
        </h2>
      </div>

      {/* Phone Number Input */}
      <div className="zonixz-phone-wrapper">
        <label className="zonixz-phone-label">Phone Number</label>
        <div className="zonixz-phone-input-wrapper">
          <div 
            className="zonixz-country-code-selector" 
            onClick={() => setShowCountryPopup(true)}
          >
            <span className="zonixz-country-flag">
              {selectedCountry.flag}
            </span>
            <span>{selectedCountry.dial_code}</span>
            <FaChevronDown className="zonixz-chevron-down" />
          </div>
          <input
            type="tel"
            className="zonixz-mobile-number-input"
            placeholder="Enter Mobile Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      {/* Country Code Popup */}
      {showCountryPopup && (
        <div className="zonixz-country-popup-overlay">
          <div className="zonixz-country-popup">
            <div className="zonixz-popup-header">
              <h3>Select Country</h3>
              <MdClose 
                className="zonixz-popup-close" 
                onClick={() => setShowCountryPopup(false)} 
              />
            </div>
            <div className="zonixz-country-list">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className={`zonixz-country-item ${
                    selectedCountry.code === country.code ? "selected" : ""
                  }`}
                  onClick={() => handleCountrySelect(country)}
                >
                  <span className="zonixz-country-flag">{country.flag}</span>
                  <span className="zonixz-country-name">{country.name}</span>
                  <span className="zonixz-country-code">
                    {country.dial_code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="zonixz-support-section">
        <h3 className="zonixz-support-heading">How Can We Help You?</h3>

        <div className="zonixz-support-grid">
          <div className="zonixz-support-card">
            <div className="zonixz-support-icon-wrapper">
              <BsFillQuestionSquareFill className="zonixz-support-icon" />
            </div>
            <h4 className="zonixz-support-card-title">FAQs</h4>
            <p className="zonixz-support-card-description">
              Find quick answers
            </p>
          </div>

          <div className="zonixz-support-card">
            <div className="zonixz-support-icon-wrapper">
              <MdOutlineSupportAgent className="zonixz-support-icon" />
            </div>
            <h4 className="zonixz-support-card-title">Contact Us</h4>
            <p className="zonixz-support-card-description">
              Get in touch directly
            </p>
          </div>

          <div className="zonixz-support-card">
            <div className="zonixz-support-icon-wrapper">
              <MdChat className="zonixz-support-icon" />
            </div>
            <h4 className="zonixz-support-card-title">Live Chat</h4>
            <p className="zonixz-support-card-description">
              Chat with a specialist
            </p>
          </div>

          <div className="zonixz-support-card">
            <div className="zonixz-support-icon-wrapper">
              <MdBook className="zonixz-support-icon" />
            </div>
            <h4 className="zonixz-support-card-title">User Guide</h4>
            <p className="zonixz-support-card-description">How to use Zonixz</p>
          </div>
        </div>
      </div>

      {/* Sign In Button */}
      <button className="zonixz-signin-button" onClick={handleSignIn}>
        Sign In
      </button>

      {/* Sign Up Link */}
      <div className="zonixz-signup-wrapper">
        <span className="zonixz-new-user-text">New to Zonixz? </span>
        <span className="zonixz-signup-link">Sign Up</span>
      </div>
    </div>
  );
};

export default CreateAccountPage;