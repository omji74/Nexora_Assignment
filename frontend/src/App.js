// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import './App.css';

// Set the base URL for all API requests
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [receipt, setReceipt] = useState(null);

  // --- API Call Functions ---

  // 1. Fetch products on component mount
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // 2. Fetch cart on component mount
  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // 3. Add to cart
  const handleAddToCart = async (productId, quantity) => {
    try {
      await api.post('/cart', { productId, quantity });
      fetchCart(); // Re-fetch cart to show updates
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // 4. Remove from cart
  const handleRemoveFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);
      fetchCart(); // Re-fetch cart
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // 5. Checkout
  const handleCheckout = async (customerDetails) => {
    try {
      const response = await api.post('/checkout', customerDetails);
      setReceipt(response.data); // Show receipt modal
      fetchCart(); // Cart is now empty, re-fetch
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Checkout failed: ' + error.response.data.message);
    }
  };

  // --- useEffect Hook ---
  // Runs once when the component mounts
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Vibe Commerce</h1>
      </header>
      <main>
        <div className="products-container">
          <h2>Products</h2>
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>
        <Cart
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      </main>
      <CheckoutModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}

export default App;