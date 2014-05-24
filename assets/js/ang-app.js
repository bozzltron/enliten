// This will include ./node_modules/angular/angular.js
// and give us access to the `angular` global object.
require('../bower_components/angular/angular');
require('../bower_components/angular-route/angular-route');
require('../bower_components/angular-resource/angular-resource');
require('../bower_components/angular-cookies/angular-cookies');

require("./services/path");
require("./services/status");
require("./controllers/paths");
require("./controllers/user");

// Create your app
angular.module('enlighten', [
	'ngRoute', 
	'enlighten.controllers',
	'enlighten.controllers.user'
	]).config(['$routeProvider', function($routeProvider) {
  
  // Specify routes to load our partials upon the given URLs
  $routeProvider.when('/', {templateUrl: 'views/home.html'});
  $routeProvider.when('/path/:id', {templateUrl: 'views/path.html'});
  $routeProvider.when('/path/:id/step/complete', {templateUrl: 'views/complete.html'})
  $routeProvider.when('/path/:id/step/:step', {templateUrl: 'views/step.html'})
  $routeProvider.when('/login', {templateUrl: 'views/login.html'})
  $routeProvider.when('/register', {templateUrl: 'views/register.html'})
  $routeProvider.otherwise({redirectTo: '/'});
  console.log("Enlighten");
}]);

