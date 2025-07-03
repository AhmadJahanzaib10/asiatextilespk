// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const { cloudinary, upload } = require('../config/cloudinary');
const authMiddleware = require('../middleware/auth');

// Multer configuration for handling multiple files
const uploadFields = upload.fields([
  { name: 'mainImg', maxCount: 1 },
  { name: 'sideImages', maxCount: 10 }
]);

// Create a new product
router.post('/create', authMiddleware, (req, res) => {
  uploadFields(req, res, async (err) => {
    try {
      // Handle multer errors
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'Error uploading files'
        });
      }

      const { title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: 'Title and description are required'
        });
      }

      // Check if main image is provided
      if (!req.files || !req.files.mainImg || req.files.mainImg.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Main image is required'
        });
      }

      // Get main image URL from Cloudinary
      const mainImgUrl = req.files.mainImg[0].path;

      // Get side images URLs from Cloudinary (if any)
      const sideImagesUrls = req.files.sideImages 
        ? req.files.sideImages.map(file => file.path)
        : [];

      // Create new product
      const newProduct = new Product({
        title: title.trim(),
        description: description.trim(),
        mainImg: mainImgUrl,
        sideImages: sideImagesUrls
      });

      // Save to database
      const savedProduct = await newProduct.save();

      console.log('✅ Product created successfully:', savedProduct._id);

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: savedProduct
      });

    } catch (error) {
      console.error('Error creating product:', error);

      // If there was an error after uploading to Cloudinary, we should clean up
      if (req.files) {
        const filesToDelete = [];
        
        if (req.files.mainImg) {
          filesToDelete.push(...req.files.mainImg.map(file => file.filename));
        }
        if (req.files.sideImages) {
          filesToDelete.push(...req.files.sideImages.map(file => file.filename));
        }

        // Delete uploaded files from Cloudinary in case of error
        for (const filename of filesToDelete) {
          try {
            await cloudinary.uploader.destroy(filename);
          } catch (deleteError) {
            console.error('Error deleting file from Cloudinary:', deleteError);
          }
        }
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while creating product'
      });
    }
  });
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// Update product
router.put('/:id', authMiddleware, (req, res) => {
  uploadFields(req, res, async (err) => {
    try {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'Error uploading files'
        });
      }

      const { title, description } = req.body;
      const productId = req.params.id;

      // Find existing product
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Prepare update data
      const updateData = {};
      
      if (title) updateData.title = title.trim();
      if (description) updateData.description = description.trim();

      // Handle main image update
      if (req.files && req.files.mainImg && req.files.mainImg.length > 0) {
        // Delete old main image from Cloudinary
        try {
          const oldMainImgPublicId = existingProduct.mainImg.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`asiatextiles/products/${oldMainImgPublicId}`);
        } catch (deleteError) {
          console.error('Error deleting old main image:', deleteError);
        }
        
        updateData.mainImg = req.files.mainImg[0].path;
      }

      // Handle side images update
      if (req.files && req.files.sideImages && req.files.sideImages.length > 0) {
        // Delete old side images from Cloudinary
        for (const oldSideImg of existingProduct.sideImages) {
          try {
            const oldSideImgPublicId = oldSideImg.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`asiatextiles/products/${oldSideImgPublicId}`);
          } catch (deleteError) {
            console.error('Error deleting old side image:', deleteError);
          }
        }
        
        updateData.sideImages = req.files.sideImages.map(file => file.path);
      }

      // Update product
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true }
      );

      console.log('✅ Product updated successfully:', updatedProduct._id);

      res.json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct
      });

    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while updating product'
      });
    }
  });
});

// Delete product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete main image from Cloudinary
    try {
      const mainImgPublicId = product.mainImg.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`asiatextiles/products/${mainImgPublicId}`);
    } catch (deleteError) {
      console.error('Error deleting main image:', deleteError);
    }

    // Delete side images from Cloudinary
    for (const sideImg of product.sideImages) {
      try {
        const sideImgPublicId = sideImg.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`asiatextiles/products/${sideImgPublicId}`);
      } catch (deleteError) {
        console.error('Error deleting side image:', deleteError);
      }
    }

    // Delete product from database
    await Product.findByIdAndDelete(req.params.id);

    console.log('✅ Product deleted successfully:', req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
});

module.exports = router;
