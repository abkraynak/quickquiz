const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const formatMessage = require('./utils/messages.js');
const { userJoin, getCurrUser, userLeaves, getRoomUsers } = require('./utils/users.js');
const { addQuiz, getQuiz } = require('./utils/quizzes.js');
const { addQuestionToQuiz, getQuestionsForQuiz } = require('./utils/questions.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const admin = 'QuickQuiz';
question = 0;

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) =>  {
    
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit('message', formatMessage(admin, 'Welcome to QuickQuiz!'));
    socket.broadcast.to(user.room).emit('message', formatMessage(admin, `${user.username} joined the game`));
    
    // Update player list
    io.to(user.room).emit('roomUsers', { 
      room: user.room, 
      users: getRoomUsers(user.room) 
    });

    // Send quiz details
    io.to(user.room).emit('quiz', {
      quiz: getQuiz(user.room),
    });
    io.to(user.room).emit('question', {
      question: getQuestionsForQuiz(user.room),
    });
  });

  // Listen for chat messages and broadcast back to everyone
  socket.on('chatMessage', (msg) => {
    const user = getCurrUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Listen for start message to begin quiz
  socket.on('start', () => {
    const user = getCurrUser(socket.id);
    io.to(user.room).emit('question', {
      question: getQuestionsForQuiz(user.room),
    });
  });

  // Show next question on set interval
  /*setInterval(function() {
    
  }, 2000);*/

  // Player leaves the game
  socket.on('disconnect', () => {
    const user = userLeaves(socket.id);
    if(user) {
      io.to(user.room).emit('message', formatMessage(admin,  `${user.username} left the game`));

      // Update player list
      io.to(user.room).emit('roomUsers', { 
      room: user.room, 
      users: getRoomUsers(user.room) 
    });
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));