const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    online: {
      type: Boolean,
      default: false
    },
    user_type: {
      type: String,
      enum: ['Student', 'Teacher'],
      default: 'Student'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
);

module.exports = mongoose.model('User', UserSchema);