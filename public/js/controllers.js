angular.module('galvanize-war-room')
.controller('OverviewController', ['$scope', 'socket', OverviewController])
.controller('DetailsController', ['$scope', 'socket', '$stateParams', DetailsController]);

function OverviewController($scope, socket) {
  socket.on('server status', function(data) {
    $scope.servers = data;
  });
}

function DetailsController($scope, socket, $stateParams) {
  socket.on('server status', function(data) {
    $scope.server = data.find(function(server) {
      return server.id == $stateParams.id;
    });
  });
}
