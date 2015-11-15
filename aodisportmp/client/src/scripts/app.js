
angular
  .module('aodispor', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ng-token-auth'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/sign_in', {
        templateUrl: 'views/user_sessions/new.html',
        controller: 'UserSessionsCtrl'
      })
      .when('/sign_up', {
        templateUrl: 'views/user_registrations/new.html',
        controller: 'UserRegistrationsCtrl'
      })
      .otherwise({
        redirectTo: '/sign_in'
      });
  });
