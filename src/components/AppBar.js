import React from 'react';
import { AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import './AppBar.css';
import logo from '../assets/Image/logo2.png';

import { FiHeart, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { RiMenu2Line } from 'react-icons/ri';

const CustomAppBar = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar className="app-toolbar">
        {/* Left: Sidebar Toggle */}
        <IconButton 
          edge="start" 
          className="menu-button"
          onClick={toggleSidebar}
        >
          <RiMenu2Line size={24} />
        </IconButton>
        
        {/* Center: Logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        
        {/* Right: Action Icons */}
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
  );
};

export default CustomAppBar;