// server/models/User.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', adminSchema, 'admin'); // use 'admin' as collection
