const socket = io();
const chatForm = document.getElementById('chat-form');

// Get chat messages from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

// Send chat messages to server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value; // Get message text
    socket.emit('chatMessage', msg);
});

// Output message to DOM
function outputMessage(msg){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${msg}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}