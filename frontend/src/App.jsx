import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoffeesPage from './pages/CoffeesPage';
import DessertsPage from './pages/DessertsPage';
import TeasPage from './pages/TeasPage';
import CartPage from './pages/CartPage';
import BlogsPage from './pages/BlogsPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coffees" element={<CoffeesPage />} />
          <Route path="/desserts" element={<DessertsPage />} />
          <Route path="/teas" element={<TeasPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
