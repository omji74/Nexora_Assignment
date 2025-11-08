const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  // We store the original product's ID for reference
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;