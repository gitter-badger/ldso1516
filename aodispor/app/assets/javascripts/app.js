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
            });

        $urlRouterProvider.otherwise('home');
    }
]);