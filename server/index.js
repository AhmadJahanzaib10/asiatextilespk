// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database');

// Load environment variables
dotenv.config();

// Routes
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const certificateRoutes = require('./routes/certificate');
const brandRoutes = require('./routes/brand');
const AnnouncementsRoutes = require('./routes/announcement');
const ContactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/announcements', AnnouncementsRoutes);
app.use('/api/contact', ContactRoutes);

// Connect to MongoDB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
  
