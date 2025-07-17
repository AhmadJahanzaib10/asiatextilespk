// server/models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  f_address: String,
  city_address: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Contact', ContactSchema, 'contact'); // use 'announcements' as collection
