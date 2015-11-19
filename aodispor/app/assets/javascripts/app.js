angular.module('aodispor', ['ui.router', 'templates', 'ng-token-auth'])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$authProvider',
    function($stateProvider, $urlRouterProvider, $authProvider, $state) {
        $authProvider.configure({
            apiUrl: 'http://localhost:3000/api',
            authProviderPaths: {
                github: '/auth/github',
                facebook: '/auth/facebook'
            },
            handleLoginResponse: function(response) {
                return response.data;
            }
        });


        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/_home.html'
            })
            .state('sign_in', {
                url: '/sign_in',
                templateUrl: 'auth/_signIn.html',
                controller: 'AuthCtrl'
            })
            .state('edit_profile', {
                url: '/users/edit_profile',
                templateUrl: 'users/_edit.html',
                controller: 'UsersCtrl',
                resolve: {
                    // If the user is not authenticated then it'll be redirected to the home page
                    auth: function($auth, $state) {
                        $auth.validateUser()
                            .catch(function() {
                                $state.go('home');
                            });
                    }
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);