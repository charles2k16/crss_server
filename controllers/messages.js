const Message = require('../models/Message');

// @desc      Get all messages
// @route     GET /api/v1/messages
exports.getMessages = async (req, res, next) => {
  const messages = await Message.find().populate({
    path: 'sender'
  })
  res.status(200).json({
    success: true,
    data: messages
  })
};


// @desc      Create message
// @route     POST /api/v1/messages
exports.createMessage = async (req, res, next) => {
  const message = await Message.create(req.body);

  res.status(200).json({
    success: true,
    data: message
  });
};
