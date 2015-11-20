angular.module('aodispor')
    .controller('UsersCtrl', function($scope, $auth) {
        $scope.updateAccount = function() {
            $auth.updateAccount($scope.updateAccountForm)
                .then(function(resp) {
                    alert('success');
                })
                .catch(function(resp) {
                    alert('error');
                });
        }
    });