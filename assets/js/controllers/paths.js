var module = angular.module('enlighten.controllers', [
	'ngResource', 
	'ngRoute', 
	'enlighten.services.path', 
	'enlighten.services.status',
	'ngCookies'
	]);

module.controller('PathsController', function ($scope, $resource, $routeParams, getPathService) {

	$scope.paths = getPathService.query();

});

module.controller('PathController', function ($scope, $resource, $routeParams, getPathService, getStatusService) {

	var path = getPathService.get($routeParams, function(){

		$scope.path = path;
		$scope.status = getStatusService.userStatusByPath({pathId:path.id});

	});

});

module.controller('StepController', function ($scope, $resource, $routeParams, getPathService, getStatusService, $cookies) {

	var path = getPathService.get($routeParams, function(){

		$scope.path = path;
		$scope.index = parseInt($routeParams.step, 10);
		$scope.step = path.steps[parseInt($routeParams.step,10) - 1 ];

		// Lookup the users current status
		var status = getStatusService.userStatusByPath({pathId:path.id}, function(){

			// Save the users current status
			$scope.status = status;


			console.log($cookies);

			// Deterimine where we are updating or inserting
			if (status.id) {
				status.step = $routeParams.step;
				status.update({status: status.id}, status);
			} else {
				status = new getStatusService({
					path: path.id,
					step: parseInt($routeParams.step, 10),
					isCompleted: $routeParams.step == path.steps.length
				});
				status.$save();
			}


		});

	});

});

module.controller('CompleteController', function ($scope, $resource, $routeParams, getPathService) {

	$scope.path = getPathService.get($routeParams);

});
