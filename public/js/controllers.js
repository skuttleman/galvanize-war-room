angular.module('galvanize-war-room')
.controller('OverviewController', ['$scope', 'Socket', 'StatusService', OverviewController])
.controller('DetailsController', ['$scope', 'Socket', 'StatusService', '$stateParams', DetailsController]);

function OverviewController($scope, Socket, StatusService) {
  $scope.getStatus = StatusService.getStatus;
  Socket.on('server status', function(data) {
    $scope.servers = data;
  });
}

function DetailsController($scope, Socket, StatusService, $stateParams) {
  $scope.getStatus = StatusService.getStatus;
  Socket.on('server status', function(data) {
    $scope.server = data.find(function(server) {
      return server.id == $stateParams.id;
    });
  });
}
