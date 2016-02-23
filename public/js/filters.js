angular.module('galvanize-war-room')
.filter('milliseconds', function() {
  return function(input) {
    return String(Math.round(Number(input) * 1000)) + 'ms';
  };
});
