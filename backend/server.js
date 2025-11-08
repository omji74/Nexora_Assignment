const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000; 

// --- Middleware ---

app.use(cors()); // Allows frontend to make requests
app.use(express.json()); // Parses incoming JSON request bodies

const mongoose = require('mongoose');
// Replace with your MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/vibe-commerce';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- In-Memory "Database" ---
let mockProducts = [
  { id: 1, name: 'Vibe T-Shirt', price: 25.99 },
  { id: 2, name: 'Groovy Jeans', price: 55.00 },
  { id: 3, name: 'Retro Sneakers', price: 78.50 },
  { id: 4, name: 'Synthwave Sunglasses', price: 15.99 },
  { id: 5, name: 'Chill Hoodie', price: 45.00 },
];

// Cart items will have a unique cartItemId
let cartItems = [];
let nextCartItemId = 1;

// --- Helper Function ---
const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
    // Find the product to get its price
    const product = mockProducts.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
};

// --- API Endpoints ---
app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

// GET /api/cart
app.get('/api/cart', (req, res) => {
  const total = calculateTotal();
  res.json({ items: cartItems, total: total });
});

// POST /api/cart

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if item is already in cart
  const existingItemIndex = cartItems.findIndex(item => item.productId === productId);

  if (existingItemIndex > -1) {
    // Update quantity
    cartItems[existingItemIndex].quantity += quantity;
    res.json(cartItems[existingItemIndex]);
  } else {
    // Add new item
    const newCartItem = {
      cartId: nextCartItemId++,
      productId: productId,
      name: product.name, // Denormalize for easier frontend display
      price: product.price, // Denormalize
      quantity: quantity,
    };
    cartItems.push(newCartItem);
    res.status(201).json(newCartItem);
  }
});

// DELETE /api/cart/:id

app.delete('/api/cart/:id', (req, res) => {
  const cartId = parseInt(req.params.id, 10);
  const itemIndex = cartItems.findIndex(item => item.cartId === cartId);

  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1); // Remove item from array
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// POST /api/checkout

app.post('/api/checkout', (req, res) => {
  const { name, email } = req.body; // Get user details from form

  if (!cartItems.length) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const total = calculateTotal();
  const receipt = {
    receiptId: `REC-${Date.now()}`,
    customerName: name,
    customerEmail: email,
    items: [...cartItems], // Copy the cart items
    total: total,
    timestamp: new Date().toISOString(),
  };

  // Clear the cart
  cartItems = [];
  nextCartItemId = 1;

  res.status(200).json(receipt);
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});