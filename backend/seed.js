const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');

dotenv.config();
connectDB();

const mockProducts = [
  { name: 'Vibe T-Shirt', price: 25.99 },
  { name: 'Groovy Jeans', price: 55.00 },
  { name: 'Retro Sneakers', price: 78.50 },
  { name: 'Synthwave Sunglasses', price: 15.99 },
  { name: 'Chill Hoodie', price: 45.00 },
];

const importData = async () => {
  try {
    // Clear old data
    await Product.deleteMany();
    await CartItem.deleteMany();

    // Insert new products
    await Product.insertMany(mockProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};
// MI thing //
// Add this to your package.json scripts: "seed": "node backend/seed.js" //
// Then run: npm run seed //
importData();