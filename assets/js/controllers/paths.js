var module = angular.module('enlighten.controllers', [
	'ngResource', 
	'ngRoute', 
	'enlighten.services.path', 
	'enlighten.services.status',
	'enlighten.services.profile'
	]);

module.controller('PathsController', function ($scope, $resource, $routeParams, Path, Status, Profile) {

	$scope.paths = Path.query(function(paths){

		for( var i = 0; i < $scope.paths.length; i++ ) {

			$scope.thumbnail = "";
			var j = 0;
			while( $scope.paths[i].firstImage == "" || j < $scope.paths[i].steps.length ) {
				if( $scope.paths[i].steps[j].type == "Photo") {
					$scope.paths[i].firstImage =  $scope.paths[i].steps[j].url;
				} else if( $scope.paths[i].steps[j].type == "Url" ) {
					$scope.paths[i].firstImage = "http://api.imago.in/get_image?website=" + $scope.paths[i].steps[j].url + "&width=500&height=350&format=image";
				}

				j++;
			}

		}

	});

});

module.controller('PathController', function ($scope, $resource, $routeParams, Path, Status, Profile, $location, flash) {

	$scope.profile = Profile.get();

	var path = Path.get($routeParams, function(){

		$scope.path = path;
		$scope.status = Status.userStatusByPath({pathId:path.id});

		if($routeParams.completed == "completed") {
			flash.success = "Congratulations!  You completed " + $scope.path.name;
		}

		//$('.panel-title').click(function(){ $(".panel-body").collapse('toggle'); });

	});

});

module.controller('StepController', function ($scope, $resource, $routeParams, Path, Status, Profile) {

	var path = Path.get({id:$routeParams.id}, function(){

		$scope.path = path;
		$scope.index = parseInt($routeParams.step, 10);
		$scope.step = path.steps[ $scope.index - 1 ];
		console.log($scope.step);

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
