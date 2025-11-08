const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

/**
 * @desc    Get all cart items and total
 * @route   GET /api/cart
 * @access  Public
 */
const getCart = async (req, res) => {
  try {
    const items = await CartItem.find({});
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Add an item to the cart
 * @route   POST /api/cart
 * @access  Public
 */
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // 1. Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Check if item is already in cart
    const existingItem = await CartItem.findOne({ productId: productId });

    if (existingItem) {
      // 3a. Update quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      res.json(existingItem);
    } else {
      // 3b. Add new item
      const newCartItem = new CartItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Remove an item from the cart
 * @route   DELETE /api/cart/:id
 * @access  Public
 */
const removeFromCart = async (req, res) => {
  try {
    const item = await CartItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Mock checkout
 * @route   POST /api/checkout
 * @access  Public
 */
const checkout = async (req, res) => {
  const { name, email } = req.body; // From frontend form

  try {
    const cartItems = await CartItem.find({});
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create receipt
    const receipt = {
      receiptId: `REC-${Date.now()}`,
      customerName: name,
      customerEmail: email,
      items: cartItems,
      total: total,
      timestamp: new Date().toISOString(),
    };

    // Clear the cart
    await CartItem.deleteMany({});

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  checkout,
};