angular.module('galvanize-war-room')
.factory('Socket', ['socketFactory', SocketFactory])
.service('StatusService', [StatusService]);

function SocketFactory(socketFactory) {
  return socketFactory();
}

function StatusService() {
  var ok = 0.05;
  var warn = 0.5;
  return {
    getStatus: function(ms) {
      if (ms <= ok) return 'ok';
      else if (ms <= warn) return 'warn';
      else return 'critical';
    }
  }
}
