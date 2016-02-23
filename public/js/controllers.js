angular.module('galvanize-war-room')
.controller('OverviewController', ['$rootScope', '$scope', 'Socket', 'StatusService', OverviewController])
.controller('DetailsController', ['$rootScope', '$scope', 'Socket', 'StatusService', '$stateParams', DetailsController]);

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
