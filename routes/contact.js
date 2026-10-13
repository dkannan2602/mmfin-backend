const express = require('express');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create new contact message (public)
router.post('/submit', async (req, res) => {
  try {
    const { name, email, mobile, loanType, message } = req.body;

    // Validate required fields
    if (!name || !mobile || !loanType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, mobile, and loan type'
      });
    }

    // Validate mobile format (basic check)
    if (!/^[0-9+\s]{10,15}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid mobile number'
      });
    }

    // Create contact
    const contact = await Contact.create({
      name: name.trim(),
      email: email ? email.trim() : '',
      mobile: mobile.trim(),
      loanType,
      message: message ? message.trim() : '',
      status: 'new'
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully! Our team will contact you soon.',
      contact: {
        id: contact._id,
        name: contact.name,
        mobile: contact.mobile
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all contacts (admin only - protected)
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      total: contacts.length,
      contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single contact (admin only - protected)
router.get('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// Update contact status (admin only - protected)
router.patch('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated',
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    });
  }
});

// Delete contact (admin only - protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

module.exports = router;
