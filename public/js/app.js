angular.module('galvanize-war-room', ['btford.socket-io', 'ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/servers');

  $stateProvider.state('overview', {
    templateUrl: '/templates/overview.html',
    controller: 'OverviewController',
    url: '/servers'
  }).state('details', {
    templateUrl: '/templates/details.html',
    controller: 'DetailsController',
    url: '/servers/:id'
  });
}]);
