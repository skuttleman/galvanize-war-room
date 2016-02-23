var warRoom = require('./warroom-client');

module.exports = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', function(socket) {
    warRoom(function(err, data) {
      if (err) return console.error(err);
      socket.emit('server status', data.data);
    });
  });
};
