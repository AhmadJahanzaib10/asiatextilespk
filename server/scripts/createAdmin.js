// server/scripts/createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const exists = await Admin.findOne({ username: 'ahmad' });
    if (exists) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('123456', 10); // You can change '123456' to any password

    const admin = new Admin({
      username: 'ahmad',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    });

    await admin.save();
    console.log('✅ Admin user created with hashed password');
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  } finally {
    process.exit(0);
  }
});
