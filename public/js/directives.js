angular.module('galvanize-war-room')
.directive('gwrHeader', function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/header.html',
    scope: {
      view: '='
    },
    controller: ['$scope', function($scope) {
      $scope.navs = [{
        link: '#/',
        text: 'Overview'
      },{
        link: '#/settings',
        text: 'Settings'
      }]
    }]
  }
});
