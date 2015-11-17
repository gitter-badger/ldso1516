angular.module('aodispor', ['ui.router', 'templates', 'ng-token-auth'])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$authProvider',
    function($stateProvider, $urlRouterProvider, $authProvider) {
        $authProvider.configure({
            apiUrl: 'http://localhost:3000/api',
            authProviderPaths: {
                github: '/auth/github',
                facebook: '/auth/facebook'
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
                    // Only authenticated users will be able to see this page
                    auth: function($auth) {
                        return $auth.validateUser();
                    }
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);