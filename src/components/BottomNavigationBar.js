// File: src/components/BottomNavigationBar.js
import React, { useState } from 'react';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper 
} from '@mui/material';
import { 
  FiHome, 
  FiGrid, 
  FiShoppingCart, 
  FiHeart, 
  FiUser 
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';


const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  // Map paths to navigation indexes
  const pathToValue = {
    '/': 0,
    '/categories': 1,
    '/cart': 2,
    '/wishlist': 3,
    '/account': 4
  };

  // Set initial value based on current path
  React.useEffect(() => {
    setValue(pathToValue[location.pathname] || 0);
  }, [location.pathname]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    
    // Navigate to the corresponding route
    switch(newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/categories');
        break;
      case 2:
        navigate('/cart');
        break;
      case 3:
        navigate('/wishlist');
        break;
      case 4:
        navigate('/account');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        display: { xs: 'block', sm: 'none' },
        zIndex: 1000
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" icon={<FiHome size={20} />} />
        <BottomNavigationAction label="Categories" icon={<FiGrid size={20} />} />
        <BottomNavigationAction label="Cart" icon={<FiShoppingCart size={20} />} />
        <BottomNavigationAction label="Wishlist" icon={<FiHeart size={20} />} />
        <BottomNavigationAction label="Account" icon={<FiUser size={20} />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;