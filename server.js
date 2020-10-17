const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const users = require('./routes/users');

const app = express();

// Body parser
app.use(express.json());

// File uploading
app.use(fileupload());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
);

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', function (data) {
    io.emit('MESSAGE', data)
  });
});