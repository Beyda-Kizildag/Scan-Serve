import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoffeesPage from './pages/CoffeesPage';
import DessertsPage from './pages/DessertsPage';
import TeasPage from './pages/TeasPage';
import CartPage from './pages/CartPage';
import BlogsPage from './pages/BlogsPage';
import { CartProvider } from './context/CartContext';
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import WaiterPage from "./pages/WaiterPage";

// Admin için route guard
const PrivateAdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  // Eğer userRole tanımlı ve 'admin' ise admin sayfasını göster, değilse login'e yönlendir
  return userRole && userRole === 'admin'
    ? children // Admin sayfası açılır
    : <Navigate to="/login" replace />; // Değilse login sayfasına yönlendir
};

// Garson için route guard
const PrivateWaiterRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  // Eğer userRole tanımlı ve 'waiter' ise garson sayfasını göster, değilse login'e yönlendir
  return userRole && userRole === 'waiter'
    ? children // Garson sayfası açılır
    : <Navigate to="/login" replace />; // Değilse login sayfasına yönlendir
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<PrivateAdminRoute><AdminPage /></PrivateAdminRoute>} />
          <Route path="/waiter" element={<PrivateWaiterRoute><WaiterPage /></PrivateWaiterRoute>} />

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