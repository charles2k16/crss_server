const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    message: String,
    media: String,
    sender_id: String,
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
);

module.exports = mongoose.model('Message', MessageSchema);