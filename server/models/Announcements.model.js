// server/models/Brand.js
const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcements', AnnouncementSchema, 'announcements'); // use 'announcements' as collection
