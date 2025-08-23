import React, { useState } from 'react';
import { 
  FaChevronDown,
  FaChevronUp,
  FaPlus // Add this import
} from 'react-icons/fa';
import { IoMdPaper } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { BsInfoCircle } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { PiHandshakeLight } from "react-icons/pi";
import { GoChecklist } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { IoLogOutOutline } from 'react-icons/io5';
import './Sidebar.css';

// Import your local image here
import backgroundImage from '../assets/Image/new.png'; // Update this path to your image

const Sidebar = () => {
  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);

  const togglePartnerDropdown = () => {
    setIsPartnerDropdownOpen(!isPartnerDropdownOpen);
  };

  const menuItems = [
    {
      id: 1,
      icon: <BiCategory />,
      title: "Browse All Categories",
      subtitle: "Cement,Steel,marbles and many more...",
      hasArrow: true
    },
    {
      id: 2,
      icon: <PiHandshakeLight />,
      title: "Partner With Us",
      expandable: true,
      onClick: togglePartnerDropdown
    },
    {
      id: 3,
      icon: <GoChecklist />,
      title: "Check Out Bonhomie Our Blog"
    },
    {
      id: 4,
      icon: <BsInfoCircle />,
      title: "About Us"
    },
    {
      id: 5,
      icon: <TbTruckDelivery />,
      title: "Track Your Order"
    },
    {
      id: 6,
      icon: <TiMessages />,
      title: "Need Help?"
    },
    {
      id: 7,
      icon: <IoMdPaper />,
      title: "Policies & More"
    }
  ];

  const partnerSubmenu = [
    "Sell On Zonixz",
    "Become a Franchise",
    "Become Our Channel Partner",
    "Become Our Pep House"
  ];

  return (
    <div className="custom-sidebar">
      {/* Profile Section */}
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
            <a href="#" className="custom-profile-link">My Profile &gt;</a>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="custom-menu-section">
        {menuItems.map((item) => (
          <div key={item.id} className="custom-menu-item-wrapper">
            <div 
              className={`custom-menu-item ${item.expandable ? 'custom-expandable' : ''}`}
              onClick={item.onClick || (() => {})}
            >
              <div className="custom-menu-content">
                <div className="custom-menu-icon">
                  {item.icon}
                </div>
                <div className="custom-menu-text">
                  <span className="custom-menu-title">{item.title}</span>
                  {item.subtitle && (
                    <span className="custom-menu-subtitle">{item.subtitle}</span>
                  )}
                </div>
              </div>
              {item.hasArrow && (
                <div className="custom-menu-arrow">
                  <span>&gt;</span>
                </div>
              )}
              {item.expandable && (
                <div className="custom-menu-toggle">
                  {isPartnerDropdownOpen ? <FaChevronDown /> : <FaChevronUp />}
                </div>
              )}
            </div>
            
            {/* Partner submenu */}
            {item.expandable && isPartnerDropdownOpen && (
              <div className="custom-submenu">
                {partnerSubmenu.map((subItem, index) => (
                  <div key={index} className="custom-submenu-item">
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="custom-footer-section">
        <div className="custom-logout-item">
          <div className="custom-menu-icon custom-logout-icon">
            <IoLogOutOutline />
          </div>
          <span className="custom-logout-text">Logout</span>
        </div>
        <div className="custom-version-text">
          App Version 1.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;