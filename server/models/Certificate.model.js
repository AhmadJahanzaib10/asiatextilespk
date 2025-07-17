// server/models/User.js
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  url: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificates', certificateSchema, 'certificates'); // use 'admin' as collection
