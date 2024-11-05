import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import ResetPasswordForm from './components/ResetPassword/ResetPasswordForm';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';
import Home from './components/HomeComponents/Home';
import Items from './components/ItemsComponents/Items';
import './App.css';
import NotFound from './pages/404.page';
import Cart from './components/CartComponents/Cart';
import HomePage from './pages/home.page';
import ProductPage from './pages/product.page';
import Favorites from './components/FavoritesComponents/Favorites';
import Profile from './components/ProfileComponents/Profile';
import { Toaster } from 'sonner';
import ItemsPage from './pages/item.page';
import FavoritesPage from './pages/favorites.page';
import CartPage from './pages/cart.page';
import ProfilePage from './pages/profile.page';
import Admin from './pages/admin.page';
import Cookies from 'js-cookie';

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAdminCookie = () => {
      const admin = Cookies.get('admin');
      const token = Cookies.get('token');
      const currentLocation = window.location.pathname; // Corrected to get the current path

      // Redirect if not an admin and not on the admin page
      if (!admin && currentLocation === '/admin') {
        window.location.href = '/login';
      }else if(!admin && !token && currentLocation === '/profile'){
        window.location.href = '/login';
      }
    };

    const startLoadingTimer = () => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Adjust timing if necessary

      return timer;
    };

    checkAdminCookie();
    const timer = startLoadingTimer();

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <LoadingComponent isFadingOut={false} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
          <Route path="/loading" element={<LoadingComponent isFadingOut={true} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/test' element={<Admin />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      )}

      <Toaster position="top-right"
        toastOptions={{
          classNames: {
            error: 'bg-red-300',
            success: 'text-green-300',
            warning: 'text-yellow-300',
            info: 'bg-blue-300'
          },
        }}
        richColors />
    </Router>
  );

}

export default App;
