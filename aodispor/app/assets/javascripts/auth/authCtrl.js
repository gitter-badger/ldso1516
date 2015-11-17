angular.module('aodispor').controller('AuthCtrl', function($scope, $location, $auth, $state) {
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };


        $scope.signOut = function() {
            $auth.signOut()
                .then(function() {
                    $state.go('home');
                })
                .catch(function(error) {
                    alert(error.data.errors);
                });
        };

        $scope.handleDestroyAccountBtnClick = function() {
          $auth.destroyAccount()
            .then(function(resp) {
              // handle success response
              $state.go('home');
            })
            .catch(function(error) {
              // handle error response
              alert(error.data.errors);
            });
        };


        $auth.validateUser()
            .then(function() {
                // If the user is signed in redirect to the home state
                // $state.go('home');
            });
    });
