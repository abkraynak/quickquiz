const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const leaveBtn = document.getElementById('leave-btn');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionList = document.querySelector('.question-main');
const quizTitle = document.getElementById('quiz-title');
const questionTitle = document.getElementById('question-title');
const answerList = document.getElementById('question-answers');

gameStarted = false;

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
socket.on('question', ({ question }) => {
    newOutputQuestion(question);
    questionList.scrollTop = questionList.scrollHeight; // Move down questions
    //outputAnswers(question);
});

// Get chat messages from server
socket.on('message', message => {
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

// Start game
startBtn.addEventListener('click', () => {
    if(gameStarted === false) {
        socket.emit('start');
        socket.emit('chatMessage', 'The game was started');
        gameStarted = true;
    }
    else {
        socket.emit('reset');
    }
});

// Next question
nextBtn.addEventListener('click', () => {
    socket.emit('next');
})

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

// Improved output question
function newOutputQuestion(question) {
    const div = document.createElement('div');
    div.classList.add('question-choices');
    div.innerHTML = `<p class="question">${question.title} </p>`;
    if(question.choices){
        question.choices.forEach((choice) => {
            const button = document.createElement('button');
            button.classList.add('select-btn');
            button.innerText = choice;
            div.appendChild(button);
        });
    }
    questionList.appendChild(div);
}