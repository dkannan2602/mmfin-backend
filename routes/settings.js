const express = require('express');
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get settings (public - anyone can view)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // Create default settings if not found
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }

    res.status(200).json({
      success: true,
      settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update settings (admin only - protected)
router.patch('/', protect, async (req, res) => {
  try {
    const { officeAddress, phone, email, businessHours } = req.body;

    // Validate required fields
    if (!officeAddress || !phone || !email || !businessHours) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    let settings = await Settings.findOne();
    
    // Create if doesn't exist
    if (!settings) {
      settings = new Settings({
        officeAddress,
        phone,
        email,
        businessHours
      });
    } else {
      settings.officeAddress = officeAddress;
      settings.phone = phone;
      settings.email = email;
      settings.businessHours = businessHours;
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
