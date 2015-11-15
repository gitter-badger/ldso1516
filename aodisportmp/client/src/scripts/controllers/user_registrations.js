angular.module('aodispor')
  .controller('UserRegistrationsCtrl', [
    '$scope',
    function($scope) {
      $scope.handleRegBtnClick = function() {
        $auth.submitRegistration($scope.registrationForm)
          .then(function(resp) {
            $auth.submitLogin({
              email: $scope.registrationForm.email,
              password: $scope.registrationForm.password
            });
          });
      };


      $scope.$on('auth:registration-email-error', function(e, reason) {
        $scope.error = reason.errors.full_messages[0];
      });
    }
  ]);
