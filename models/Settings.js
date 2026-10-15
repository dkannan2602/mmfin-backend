const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    officeAddress: {
      type: String,
      default: '123, Anna Salai, Chennai – 600 002, Tamil Nadu'
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    email: {
      type: String,
      default: 'info@maduraimeenakshifinance.in'
    },
    businessHours: {
      type: String,
      default: 'Mon – Sat: 9:00 AM – 7:00 PM'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
