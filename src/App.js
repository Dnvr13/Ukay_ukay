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
import HomeTest from './pages/home.page';
import ProductPage from './pages/product.page';
import Favorites from './components/FavoritesComponents/Favorites';
import Profile from './components/ProfileComponents/Profile';
import { Toaster } from 'sonner';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust timing if necessary

    return () => clearTimeout(timer);
  }, []);


  return (
    <Router>
      {loading ? (
        <LoadingComponent isFadingOut={false} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ResetPasswordForm />} />
          <Route path="/loading" element={<LoadingComponent isFadingOut={true} />} />
          <Route path="/home" element={<Home />} /> {/* Existing Home Route */}
          <Route path="/items" element={<Items />} /> {/* New Items Route */}
          <Route path='/admin' element={<ProductPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/test' element={<HomeTest />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      )}

      <Toaster position="top-right"
      toastOptions={{      
        classNames: {
          error: 'bg-red-300',
          success: 'text-green-300',
          warning: 'text-yellow-300',
          info: 'bg-blue-300',
        },
      }}/>
    </Router>
  );

}

export default App;
