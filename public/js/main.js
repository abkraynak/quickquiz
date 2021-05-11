const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Join game room
socket.emit('joinRoom', { username, room });

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