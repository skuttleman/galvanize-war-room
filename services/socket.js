var store = require('./store');
var sockets = [];
var warRoom = require('./warroom-client');

warRoom(function(err, data) {
  if (err) return console.error(err);
  store.update(data.data).then(function(response) {
    sockets.forEach(function(socket) {
      if (socket) socket.emit('server status', response);
    });
  }).catch(console.error);
});

module.exports = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', function(socket) {
    sockets.push(socket);
  });
};


// Clean sockets array every minute
setInterval(function() {
  sockets = sockets.filter(function(socket) {
    return socket.connected;
  });
  console.log(sockets.length);
}, 60000);
