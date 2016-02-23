angular.module('galvanize-war-room')
.factory('Socket', ['socketFactory', SocketFactory])
.service('StatusService', [StatusService]);

function SocketFactory(socketFactory) {
  return socketFactory();
}

function StatusService() {
  var service = {
    ok: 0.05,
    warn: 0.5,
    getStatus: function(ms) {
      console.log(ms);
      if (ms <= service.ok) return 'ok';
      else if (ms <= service.warn) return 'warn';
      else return 'critical';
    },
    updateOk: function(newOk) {
      service.ok = newOk / 1000;
    },
    updateWarn: function(newWarn) {
      service.warn = newWarn / 1000;
    }
  };
  return service;
}
