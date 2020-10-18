const path = require('path');
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

// @desc      Delete message
// @route     DELETE /api/v1/messages/:id
exports.deleteMessage = async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
};


// @desc      Upload photo/files
// @route     PUT /api/v1/messages/upload

exports.messageFileUpload = async (req, res, next) => {

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next();
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next();
  }

  // Create custom filename
  let randomString = Math.random().toString(36).substring(7).toUpperCase();
  file.name = `messageFile-${randomString}.png`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
    }

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
};
