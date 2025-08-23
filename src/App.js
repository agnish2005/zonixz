import React, { useState } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import CustomAppBar from './components/AppBar';
import { Box, CssBaseline, Drawer } from '@mui/material';
import Categories from './components/Categories';
import SingleCategorySlider from './components/SingleCategorySlider';
import Toppick from './components/Toppick';
import BottomNavigationBar from './components/BottomNavigationBar';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import Coupon from './pages/Coupon';
import CreateAccountPage from './pages/CreateAccountPage';
import SignInPage from './pages/SignInPage';
import Sidebar from './components/Sidebar';
import OTPVerificationPage from './pages/OTPVerificationPage'; // Import OTP page
import Profile from './pages/Profile'; 
import Filter from './pages/Filter'; // Import Filter component

// Home page component
const HomePage = () => (
  <>
    <Categories />
    <SingleCategorySlider />
    <Toppick />
  </>
);

// Main App component
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      pb: { xs: 7, sm: 0 } 
    }}>
      <CssBaseline />
      
      {/* AppBar - Hide on account page for cleaner UI */}
      {!location.pathname.includes('/account') && 
       !location.pathname.includes('/verify-otp') && (
        <CustomAppBar toggleSidebar={toggleSidebar} />
      )}
      
      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={closeSidebar}
      >
        <Sidebar closeSidebar={closeSidebar} />
      </Drawer>
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          width: '100%',
          marginTop: !location.pathname.includes('/account') && 
                    !location.pathname.includes('/verify-otp') ? '20px' : 0,
          marginBottom: { xs: '0px', sm: 0 } 
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/coupons" element={<Coupon />} />
          <Route path="/account/create" element={<CreateAccountPage />} />
          <Route path="/account/signin" element={<SignInPage />} />
          {/* Add these new routes */}
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
      </Box>
      
      {/* Bottom Navigation - Hide on OTP and Profile pages */}
      {!location.pathname.includes('/verify-otp') && 
        (
        <BottomNavigationBar />
      )}
    </Box>
  );
}

// Wrap the app with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;