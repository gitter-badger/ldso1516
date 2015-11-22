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
            $scope.updateAccountForm.user.job = $scope.updateAccountForm.user.job || null;
            $scope.updateAccountForm.user.job_description = $scope.updateAccountForm.user.job_description || null;
            $scope.updateAccountForm.user.price = $scope.updateAccountForm.user.price || null;
            $scope.updateAccountForm.user.updating = true;


            $auth.updateAccount($scope.updateAccountForm)
                .then(function(resp) {
                    alert('success');
                })
                .catch(function(resp) {
                    parseErrors(resp);
                });
        };


        function parseErrors(resp) {
            var data = resp.data;
            if(data.status === "error") {
                var errors = data.errors;
                swapState(errors, "job", errors.job || null);
                swapState(errors, 'job_description', errors.job_description || null);
                swapState(errors, 'price', errors.price || null);
            }
        }


        function swapState(errors, str, message) {
            if(errors.hasOwnProperty(str)) {
                $('.' + str + ' label.input').addClass('state-error');
                if(message != null)
                    $('.' + str + ' div.note').html(message[0]);
            } else {
                $('.' + str + ' label.input').removeClass('state-error');
                $('.' + str + ' div.note').html('');
            }
        }
    });