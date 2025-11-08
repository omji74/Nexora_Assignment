const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  checkout,
} = require('../controllers/cartController');

// GET /api/cart
router.route('/').get(getCart);

// POST /api/cart
router.route('/').post(addToCart);

// DELETE /api/cart/:id
router.route('/:id').delete(removeFromCart);

// POST /api/cart/checkout
router.route('/checkout').post(checkout);

module.exports = router;