const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Import Routes ---
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// --- Config and DB Connection ---
dotenv.config(); // Load .env variables
connectDB(); // Connect to MongoDB


const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Vibe Commerce API Running...');
});

// Mount routers
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});