const express = require('express');
const router = express.Router();
const Contact = require("../models/Contact.model")

// GET / - Get the single Contact document
router.get('/', async (req, res) => {
    try {
        const contact = await Contact.findOne({});
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT / - Update the single Contact document
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { fAddress, cityAddress, email, phone } = req.body;
        // Map camelCase to snake_case for MongoDB
        const updateData = {
            f_address: fAddress,
            city_address: cityAddress,
            email,
            phone
        };

        // Find and update the one document
        const updatedContact = await Contact.findOneAndUpdate(
            { _id: id },
            updateData,         // New data to update with
            { new: true }       // Return the updated document
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact document not found" });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;