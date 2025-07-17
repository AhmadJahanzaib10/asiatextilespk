const express = require('express');
const router = express.Router();
const Announcements = require("../models/Announcements.model")

router.get('/', async (req, res) => {
    try {
      const announcements = await Announcements.find(); // fetch all documents
      res.json(announcements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAnnouncement = await Announcements.findByIdAndDelete(id);
  
      if (!deletedAnnouncement) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
  
      res.json({ message: 'Announcement deleted successfully', announcement: deletedAnnouncement });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/create', async (req, res) => {
    try {
      const { announcement } = req.body;
  
      // Create a new announcement document
      const newAnnouncement = new Announcements({
        title: announcement,
      });
  
      // Save to the database
      await newAnnouncement.save();
  
      res.status(201).json({
        message: 'Announcement created successfully',
        announcement: newAnnouncement
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;