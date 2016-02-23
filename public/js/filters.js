angular.module('galvanize-war-room')
.filter('milliseconds', function() {
  return function(input) {
    var milliseconds = Math.round(Number(input) * 1000);
    return milliseconds ? String(milliseconds) + 'ms' : '';
  };
});
