angular.module('galvanize-war-room')
.controller('OverviewController', ['$scope', 'socket', OverviewController]);

function OverviewController($scope, socket) {
  socket.on('server status', function(data) {
    $scope.servers = data;
  });
}
