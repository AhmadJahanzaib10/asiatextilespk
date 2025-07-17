const express = require('express');
const router = express.Router();
const Certificates = require('../models/Certificate.model');
const {cloudinary, uploadCertificate } = require('../config/cloudinary'); // multer-storage-cloudinary
const authMiddleware = require('../middleware/auth'); // if you want protected access



router.get("/all", async (req, res)=>{
    try {
        const certificates = await Certificates.find({}); // newest first
        res.status(200).json({
          success: true,
          data: certificates,
        });
      } catch (err) {
        console.error("Error fetching certificates:", err);
        res.status(500).json({
          success: false,
          message: "Server error while fetching certificates",
        });
      }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // 1. Find the certificate in DB
      const existingCertificate = await Certificates.findById(id);
      if (!existingCertificate) {
        return res.status(404).json({ success: false, message: 'Certificate not found' });
      }
  
      // 2. Extract public ID for Cloudinary deletion
      console.log(existingCertificate.url)
      const publicId = existingCertificate.url.split('/').pop().split('.')[0];
      const cloudinaryFolder = 'asiatextiles/certificates';
      const fullPublicId = `${cloudinaryFolder}/${publicId}`;
  
      // 3. Delete image from Cloudinary
      await cloudinary.uploader.destroy(fullPublicId);
  
      // 4. Delete from MongoDB
      await Certificates.findByIdAndDelete(id);
  
      // 5. Respond to frontend
      return res.status(200).json({ success: true, message: 'Certificate deleted successfully' });
  
    } catch (error) {
      console.error('❌ Error deleting certificate:', error);
      return res.status(500).json({ success: false, message: 'Server error during deletion' });
    }
  });
// Certification Upload Route
router.post('/upload', authMiddleware, (req, res) => {
    console.log("Upload Hit")
    uploadCertificate.single('certificateImg')(req, res, async (err) => {
    try {
      // Handle multer errors
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'Error uploading certificate image',
        });
      }

      // Check if file is uploaded
      if (!req.file || !req.file.path) {
        return res.status(400).json({
          success: false,
          message: 'Certificate image is required',
        });
      }

      // Get Cloudinary URL
      const imageUrl = req.file.path;

      // Save to MongoDB
      const newCertificate = new Certificates({
        url: imageUrl,
      });

      const savedCertificate = await newCertificate.save();

      console.log('✅ Certificate uploaded:', savedCertificate._id);

      res.status(201).json({
        success: true,
        message: 'Certificate uploaded successfully',
        certificate: savedCertificate,
      });
    } catch (error) {
      console.error('Error saving certificate:', error);

      // Attempt cleanup if image was uploaded to Cloudinary
      if (req.file && req.file.filename) {
        try {
          await cloudinary.uploader.destroy(req.file.filename);
        } catch (deleteError) {
          console.error('Error deleting certificate from Cloudinary:', deleteError);
        }
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while uploading certificate',
      });
    }
  });
});

module.exports = router;
