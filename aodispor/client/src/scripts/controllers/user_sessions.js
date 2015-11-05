angular.module('aodispor')
  .controller('UserSessionsCtrl', [
    '$scope',
    function($scope) {
      $scope.$on('auth:login-error', function(ev, reason) {
        $scope.error = reason.errors[0];
      });


      $scope.$on('auth:login-success', function(ev, user) {
        $scope.success = "Welcome, " + user.email;
      });
}]);
