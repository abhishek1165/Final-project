const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name can’t exceed 50 characters']
  },
  issue: {
    type: String,
    required: [true, 'Issue description is required'],
    trim: true,
    minlength: [5, 'Issue must be at least 5 characters'],
    maxlength: [300, 'Issue can’t exceed 300 characters']
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High'],
    default: 'Normal'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
