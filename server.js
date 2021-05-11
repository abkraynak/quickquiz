const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// When client connects
io.on('connection', socket => {
  socket.emit('message', 'Welcome to QuickQuiz!');
  socket.broadcast.emit('message', 'New user joined');
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the game');
  })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
