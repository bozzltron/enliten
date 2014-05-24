var module = angular.module('enlighten.controllers', [
	'ngResource', 
	'ngRoute', 
	'enlighten.services.path', 
	'enlighten.services.status',
	'enlighten.services.profile'
	]);

module.controller('PathsController', function ($scope, $resource, $routeParams, Path) {

	$scope.paths = Path.query();

});

module.controller('PathController', function ($scope, $resource, $routeParams, Path, Status) {

	var path = Path.get($routeParams, function(){

		$scope.path = path;
		$scope.status = Status.userStatusByPath({pathId:path.id});

	});

});

module.controller('StepController', function ($scope, $resource, $routeParams, Path, Status, Profile) {

	var path = Path.get($routeParams, function(){

		$scope.path = path;
		$scope.index = parseInt($routeParams.step, 10);
		$scope.step = path.steps[parseInt($routeParams.step,10) - 1 ];

		// Lookup the users current status
		var status = Status.userStatusByPath({pathId:path.id}, function(){

			// Save the users current status
			$scope.status = status;

			var profile = Profile.get(function(){

				$scope.profile = profile.id;
				if(profile.id)  {

					// Deterimine where we are updating or inserting
					if (status.id) {
						status.step = parseInt($routeParams.step, 10);
						status.isCompleted = $routeParams.step == path.steps.length;
						Status.update({statusId: status.id}, status);
					} else {
						status = new Status({
							path: path.id,
							step: parseInt($routeParams.step, 10),
							isCompleted: $routeParams.step == path.steps.length,
							user: profile.id
						});
						status.$save();
					}

				}

			})

		});

	});

});

module.controller('CompleteController', function ($scope, $resource, $routeParams, Path) {

	$scope.path = Path.get($routeParams);

});
