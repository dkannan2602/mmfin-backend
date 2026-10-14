const express = require('express');
const Quick = require('../models/Quick');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create new quick inquiry (public)
router.post('/submit', async (req, res) => {
  try {
    const { loanType, mobileNumber } = req.body;

    // Validate required fields
    if (!loanType || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide loan type and mobile number'
      });
    }

    // Validate mobile format (10-15 digits, +, spaces)
    if (!/^[0-9+\s]{10,15}$/.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid mobile number'
      });
    }

    // Create quick inquiry
    const quick = await Quick.create({
      loanType,
      mobileNumber: mobileNumber.trim(),
      status: 'new'
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully! Our team will contact you soon.',
      quick: {
        id: quick._id,
        mobileNumber: quick.mobileNumber,
        loanType: quick.loanType
      }
    });
  } catch (error) {
    console.error('Quick inquiry submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all quick inquiries (admin only - protected)
router.get('/', protect, async (req, res) => {
  try {
    const inquiries = await Quick.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      total: inquiries.length,
      inquiries  // Changed from 'quick' to 'inquiries'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update quick inquiry status and notes (admin only - protected)
router.patch('/:id', protect, async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (status && !['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    updateData.updatedAt = new Date();

    const quick = await Quick.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!quick) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      quick
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update inquiry'
    });
  }
});

// Delete quick inquiry (admin only - protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const quick = await Quick.findByIdAndDelete(req.params.id);

    if (!quick) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry'
    });
  }
});

module.exports = router;
