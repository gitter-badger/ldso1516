angular.module('aodispor')
    .controller('AuthCtrl', function($scope, $location, $auth, $state, $rootScope) {
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


        /**$auth.validateUser()
            .then(function(data) {
                // The user is logged in...
                if(data.signedIn == true && data.job == null && data.job_description == null && data.price == null) {
                    alert('here');
                }
            });*/
    });