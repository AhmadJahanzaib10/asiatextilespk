// server/models/Brand.js
const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model('Brandinfo', BrandSchema, 'brandinfo'); // use 'admin' as collection
