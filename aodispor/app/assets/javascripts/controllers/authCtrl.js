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


        $auth.validateUser()
            .then(function(data) {
                // Only show this alert if we're not in the edit_profile state
                if($state.current.name !== 'edit_profile' && data.signedIn == true && data.job == null && data.job_description == null && data.price == null) {
                    // If job, job_description and price are not still set we need to redirect the user to the edit profile page
                    alert('Redirect the the edit profile page');
                }
            });


        $scope.updateAccount = function() {
            $auth.updateAccount($scope.updateAccountForm)
                .then(function(resp) {
                    alert('success');
                })
                .catch(function(resp) {
                    alert(JSON.stringify(resp));
                });
        }
    });