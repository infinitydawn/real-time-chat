let userId;

const socket = io('http://localhost:3000');

const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');


socket.on('user id', (id) => {
  userId = "User #"+id.substring(0,4);
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.emit('chat message', { userId, message });
  messageInput.value = '';
});

socket.on('chat message', (data) => {
  const { userId, message } = data;
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<div class="row" >${userId}: <div>${message}</div></div>`;
  messages.appendChild(messageElement);
});
