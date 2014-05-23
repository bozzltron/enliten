var module = angular.module('enlighten.controllers', ['ngResource', 'ngRoute', 'enlighten.services'])

module.controller('PathsController', function ($scope, $resource, $routeParams, getPathService) {

	$scope.paths = getPathService.query();

});

module.controller('PathController', function ($scope, $resource, $routeParams, getPathService) {

	$scope.path = getPathService.get($routeParams);

});

module.controller('StepController', function ($scope, $resource, $routeParams, getPathService) {

	var path = getPathService.get($routeParams, function(){

	$scope.path = path;
	$scope.index = parseInt($routeParams.step, 10);
	$scope.step = path.steps[parseInt($routeParams.step,10) - 1 ];

	});

});