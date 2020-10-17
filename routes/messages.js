const express = require('express');
const {
  getMessages,
  createMessage,
} = require('../controllers/messages');

const Message = require('../models/Message');

const router = express.Router();

router
  .route('/')
  .get(getMessages)
  .post(createMessage);


module.exports = router;