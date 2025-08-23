import React from 'react';
import { FiGift } from 'react-icons/fi';
import { TbTruckDelivery } from "react-icons/tb";
import { ImCreditCard } from "react-icons/im";
import { GoShieldCheck } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';
import initialImage from '../assets/Image/initial.png';


const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="account-container">
      {/* Hero Image */}
      <img src={initialImage} alt="Create Account" className="account-image" />
      
      {/* Action Buttons Section */}
      <div className="buttons-section">
        <button 
          className="create-account-btn"
          onClick={() => navigate('/account/signin')}
        >
          Create Account
        </button>
        
        <button 
          className="sign-in-btn"
          onClick={() => navigate('/account/create')}
        >
          Sign In
        </button>
      </div>

      {/* Features List Section */}
      <div className="features-section">
        {/* Feature 1 */}
        <div className="feature-item">
          <div className="feature-icon">
            <FiGift size={24} />
          </div>
          <span className="feature-text">
            Get ₹1000 off on your first order
          </span>
        </div>
        
        {/* Feature 2 */}
        <div className="feature-item">
          <div className="feature-icon">
            <TbTruckDelivery size={24} />
          </div>
          <span className="feature-text">
            Free delivery on orders above ₹500
          </span>
        </div>
        
        {/* Feature 3 */}
        <div className="feature-item">
          <div className="feature-icon">
            <ImCreditCard size={24} />
          </div>
          <span className="feature-text">
            Get ₹200 off on bank transfers
          </span>
        </div>
        
        {/* Feature 4 */}
        <div className="feature-item">
          <div className="feature-icon">
            <GoShieldCheck size={24} />
          </div>
          <span className="feature-text">
            Secure payments with 256-bit encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;