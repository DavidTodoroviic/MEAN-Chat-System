const socketIO = require('socket.io'); // socket.io is imported

let io; // Declare io variable

function init(server) {
  io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Broadcast a new message to all clients
    socket.on('message', (message) => {
      io.emit('message', message);
    });

    // Handle user joining a channel
    socket.on('joinChannel', (channelId, userId) => {
      socket.join(channelId);
      io.to(channelId).emit('userJoined', { channelId, userId });
    });

    // Handle user leaving a channel
    socket.on('leaveChannel', (channelId, userId) => {
      socket.leave(channelId);
      io.to(channelId).emit('userLeft', { channelId, userId });
    });

    // When the client disconnects
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = {
  init
};