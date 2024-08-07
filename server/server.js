const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

const socketServer = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

socketServer.on('connection', (socket) => {
  console.log('A user connected');
  

  const userId = socket.id;
  
  
  socket.emit('user id', userId);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (data) => {
    const { userId, message } = data;
    socketServer.emit('chat message', { userId, message });
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
