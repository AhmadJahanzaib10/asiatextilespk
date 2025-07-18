// server/routes/admin.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin.model');
const authMiddleware = require("../middleware/auth")

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const all = await Admin.find();
    const user = await Admin.findOne({ username });
    if (!user) {
      console.log("Username is incorrect");
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password is incorrect");
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log(username)

    const token = jwt.sign({ id: user._id, username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get current admin profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json({ 
      success: true, 
      username: admin.username,
      role: admin.role 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
