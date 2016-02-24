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
  $scope.newOk = Math.round(StatusService.getOk() * 1000);
  $scope.newWarn = Math.round(StatusService.getWarn() * 1000);
  $scope.updateOk = StatusService.updateOk;
  $scope.updateWarn = StatusService.updateWarn;
}
