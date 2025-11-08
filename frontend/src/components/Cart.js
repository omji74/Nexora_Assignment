// src/components/Cart.js
import React, { useState } from 'react';

const Cart = ({ cart, onRemoveFromCart, onCheckout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }
    onCheckout({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.cartId} className="cart-item">
              <div className="cart-item-info">
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                className="remove-btn"
                onClick={() => onRemoveFromCart(item.cartId)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            Total: ${cart.total.toFixed(2)}
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Checkout</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Complete Purchase</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Cart;