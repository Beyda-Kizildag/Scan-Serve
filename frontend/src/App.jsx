import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoffeesPage from './pages/CoffeesPage';
import DessertsPage from './pages/DessertsPage';
import TeasPage from './pages/TeasPage';
import CartPage from './pages/CartPage';
import BlogsPage from './pages/BlogsPage';
import { CartProvider } from './context/CartContext';
import AdminDashboard from './pages/AdminDashboard';
import AuthPage from './components/AuthPage';
import WaiterPage from './pages/WaiterPage';

// Admin route guard
const PrivateAdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  return userRole === 'admin' ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WaiterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/coffees" element={<CoffeesPage />} />
          <Route path="/desserts" element={<DessertsPage />} />
          <Route path="/teas" element={<TeasPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/admin" element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;