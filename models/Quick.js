const mongoose = require('mongoose');

const quickSchema = new mongoose.Schema({
  loanType: {
    type: String,
    required: true,
    enum: [
      'Home Loan',
      'Personal Loan',
      'Business Loan',
      'Vehicle Loan',
      'Loan Against Property',
      'Education Loan'
    ]
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quick', quickSchema);
