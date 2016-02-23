angular.module('galvanize-war-room')
.factory('Socket', ['socketFactory', SocketFactory])
.service('StatusService', ['$http', StatusService]);

function SocketFactory(socketFactory) {
  return socketFactory();
}

function StatusService($http) {
  var service = {
    getStatus: function(ms) {
      if (ms <= service.ok) return 'ok';
      else if (ms <= service.warn) return 'warn';
      else return 'critical';
    },
    updateOk: function(newOk) {
      service.ok = newOk / 1000;
      $http.put('/api/settings', {
        ok: service.ok
      });
    },
    updateWarn: function(newWarn) {
      service.warn = newWarn / 1000;
      $http.put('/api/settings', {
        warn: service.warn
      });
    }
  };
  return service;
}
