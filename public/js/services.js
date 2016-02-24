angular.module('galvanize-war-room')
.factory('Socket', ['socketFactory', SocketFactory])
.service('StatusService', ['$http', StatusService]);

function SocketFactory(socketFactory) {
  return socketFactory();
}

function StatusService($http) {
  var ok, warn;
  $http.get('/api/settings').then(function(data) {
    ok = data.data.settings.ok;
    warn = data.data.settings.warn;
  });
  return {
    getStatus: function(ms) {
      if (ms <= ok) return 'ok';
      else if (ms <= warn) return 'warn';
      else return 'critical';
    },
    getOk: function() {
      return ok;
    },
    getWarn: function() {
      return warn;
    },
    updateOk: function(newOk) {
      ok = newOk / 1000;
      $http.put('/api/settings', {
        ok: ok
      });
    },
    updateWarn: function(newWarn) {
      warn = newWarn / 1000;
      $http.put('/api/settings', {
        warn: warn
      });
    }
  };
}
