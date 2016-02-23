angular.module('galvanize-war-room')
.factory('socket', ['socketFactory', SocketFactory]);

function SocketFactory(socketFactory) {
  return socketFactory();
}
