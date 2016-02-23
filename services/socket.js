var warRoom = require('./warroom-client');
var store = require('./store');

module.exports = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', function(socket) {
    warRoom(function(err, data) {
      if (err) return console.error(err);
      store.update(data.data).then(function(response) {
        console.log(response);
        socket.emit('server status', response);
      }).catch(console.error);
    });
  });
};
