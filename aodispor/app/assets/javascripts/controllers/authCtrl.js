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


        /**
         * Update these 3 variables whenever they change
         * This directly updates the view
         */
        $scope.$watch('job', function () {
            $scope.updateAccountForm.user.job=$scope.job;
        });

        $scope.$watch('job_description', function() {
            $scope.updateAccountForm.user.job_description=$scope.job_description;
        });

        $scope.$watch('price', function() {
            $scope.updateAccountForm.user.price=$scope.price;
        });


        $auth.validateUser()
            .then(function(data) {
                // Only show this alert if we're not in the edit_profile state
                if($state.current.name !== 'edit_profile' && data.signedIn == true && data.job == null && data.job_description == null && data.price == null) {
                    // If job, job_description and price are not still set we need to redirect the user to the edit profile page
                    alert('Redirect the the edit profile page');
                } else if(data.job != null && data.job_description != null && data.price != null) {
                    $scope.job = data.job;
                    $scope.job_description = data.job_description;
                    $scope.price = data.price;
                }
            });



        $scope.updateAccount = function() {
            $scope.updateAccountForm.user.updating = true;


            $auth.updateAccount($scope.updateAccountForm)
                .then(function(resp) {
                    alert('success');
                    parseErrors(resp);
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
            } else {
                removeErrors('job');
                removeErrors('job_description');
                removeErrors('price');
            }
        }


        function swapState(elem, str, message) {
            if(elem.hasOwnProperty(str)) {
                $('.' + str + ' label.input').addClass('state-error');
                if(message != null)
                    $('.' + str + ' div.note').html(message[0]);
            } else {
                $('.' + str + ' label.input').removeClass('state-error');
                $('.' + str + ' div.note').html('');
            }
        }


        function removeErrors(str) {
            $('.' + str + ' label.input').removeClass('state-error');
            $('.' + str + ' div.note').html('');
        }
    })
    .directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value, 10);
                });
            }
        }
    });