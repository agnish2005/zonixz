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
import OTPVerificationPage from './pages/OTPVerificationPage';
import Profile from './pages/Profile'; 
import Filter from './pages/Filter';
import Categorylist from './pages/Categorielist';
import Details from './pages/Details';
import AddressesPage from './pages/AddressesPage';
import PurchaseSettingsPage from './pages/PurchaseSettingsPage';
import ReviewPurchasesPage from './pages/ReviewPurchasesPage';
import RecentlyViewedPage from './pages/RecentlyViewedPage';

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

  // Determine if we should hide the AppBar
  const shouldHideAppBar = () => {
    const path = location.pathname;
    return (
      path.includes('/account') ||
      path.includes('/verify-otp') ||
      path.includes('/category/') ||
      path.includes('/addresses') ||
      path.includes('/purchase-settings') ||
      path.includes('/review-purchases') ||
      path.includes('/recently-viewed')
    );
  };

  // Determine if we should hide the BottomNavigation
  const shouldHideBottomNav = () => {
    return location.pathname.includes('/verify-otp');
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      pb: { xs: shouldHideBottomNav() ? 0 : 7, sm: 0 } 
    }}>
      <CssBaseline />
      
      {/* AppBar - Hide on account, OTP, and category pages */}
      {!shouldHideAppBar() && (
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
          flexGrow: 1,
          width: '100%',
          marginTop: !shouldHideAppBar() ? '25px' : 0, // Adjust based on AppBar height
          padding: 0
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
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/category-list" element={<Categorylist />} />
          <Route path="/details" element={<Details />} />
          {/* New routes for account menu items */}
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/purchase-settings" element={<PurchaseSettingsPage />} />
          <Route path="/review-purchases" element={<ReviewPurchasesPage />} />
          <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
        </Routes>
      </Box>
      
      {/* Bottom Navigation - Hide only on OTP */}
      {!shouldHideBottomNav() && (
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