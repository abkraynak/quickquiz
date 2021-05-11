const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leaveBtn = document.getElementById('leave-btn');
const quizTitle = document.getElementById('quiz-title');

// Get username and room (from URL)
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Join game room
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Get quiz details
socket.on('quiz', ({ quiz }) => {
    outputQuiz(quiz);
});

// Get question
socket.on('question', ({  }) => {

});

// Get chat messages from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll down to new message
});

// Send chat messages to server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value; // Get message text
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = ''; // Clear input from message 

});

// Pop-up window to confirm leaving game
leaveBtn.addEventListener('click', () => {
    const leaveGame = confirm('Are you sure you want to leave?');
    if(leaveGame) {
        window.location = '../index.html'
    }
});

// Output message to DOM
function outputMessage(msg){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username}  <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
}

// Add quiz title
function outputQuiz(quiz) {
    quizTitle.innerText = quiz.title;
}