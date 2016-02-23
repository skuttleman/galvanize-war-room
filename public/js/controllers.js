angular.module('galvanize-war-room')
.controller('OverviewController', ['$rootScope', '$scope', 'Socket', 'StatusService', OverviewController])
.controller('DetailsController', ['$rootScope', '$scope', 'Socket', 'StatusService', '$stateParams', DetailsController])
.controller('SettingsController', ['$rootScope', '$scope', 'StatusService', '$http', SettingsController]);

function OverviewController($rootScope, $scope, Socket, StatusService) {
  $rootScope.view = 'Overview';
  $scope.getStatus = StatusService.getStatus;
  Socket.on('server status', function(data) {
    $scope.servers = data;
  });
}

function DetailsController($rootScope, $scope, Socket, StatusService, $stateParams) {
  $rootScope.view = 'Details';
  $scope.getStatus = StatusService.getStatus;
  Socket.on('server status', function(data) {
    $scope.server = data.find(function(server) {
      return server.id == $stateParams.id;
    });
  });
}

function SettingsController($rootScope, $scope, StatusService, $http) {
  $rootScope.view = 'Settings';
  $http.get('/api/settings').then(function(data) {
    $scope.newOk = Math.round(data.data.settings.ok * 1000);
    $scope.newWarn = Math.round(data.data.settings.warn * 1000);
    StatusService.updateOk($scope.newOk);
    StatusService.updateWarn($scope.newWarn);
  });
  $scope.updateOk = StatusService.updateOk;
  $scope.updateWarn = StatusService.updateWarn;
}
