var module = angular.module('enlighten.controllers.nav', ['ngResource', 'ngRoute', 'enlighten.services.profile'])

module.controller('NavController', function ($scope, $resource, $routeParams, Profile) {

	$scope.profile = Profile.get();
	
});
