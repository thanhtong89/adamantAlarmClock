'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/clock', {templateUrl: 'partials/clock.html', controller: ClockController});
    $routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: SettingsController});
    $routeProvider.otherwise({redirectTo: '/clock'});
  }]);
