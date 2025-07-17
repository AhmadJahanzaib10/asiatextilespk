const express = require('express');
const router = express.Router();
const Brand = require("../models/Brand.model")

router.get('/', async (req, res) => {
    try {
      const brand = await Brand.findOne(); // no filter, returns the first document
      if (!brand) return res.status(404).json({ message: 'Brand not found' });
      res.json(brand);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/edit', async (req, res) => {
    try {
      const { title, description } = req.body;
  
      const updatedBrand = await Brand.findOneAndUpdate(
        {}, // no filter, since there's only one document
        { title, description },
        { new: true } // return the updated document
      );
  
      if (!updatedBrand) return res.status(404).json({ message: 'Brand not found' });
  
      res.json({ message: 'Brand updated successfully', brand: updatedBrand });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;