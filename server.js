const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const formatMessage = require('./utils/messages.js');
const { userJoin, getCurrUser } = require('./utils/users.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const admin = 'QuickQuiz';

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// When client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) =>  {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit('message', formatMessage(admin, 'Welcome to QuickQuiz!'));
    socket.broadcast.to(user.room).emit('message', formatMessage(admin, `${user.username} joined`));
  });

  // Listen for chat messages and broadcast back to everyone
  socket.on('chatMessage', (msg) => {
    io.emit('message', formatMessage('USER', msg));
  });

  socket.on('disconnect', () => {
    io.emit('message', formatMessage(admin, 'A user has left the game'));
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
