const socketIO = require('socket.io');

let io;

function init(server) {
  io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Broadcast a new message to all clients
    socket.on('message', (message) => {
      io.emit('message', message);
    });

    // When the client disconnects
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = { init };
