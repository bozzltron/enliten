var module = angular.module('enlighten.controllers.editor', ['enlighten.services.profile', 'enlighten.services.path', 'ngRoute']);

module.controller('EditorController', function ($scope, Profile, Path, $routeParams, flash) {

	$scope.profile = Profile.get();
	
	if($routeParams.path) {
		$scope.path = Path.get({id:$routeParams.path});
	}

	// Handle the initial creation of the path
	this.submit = function(path) {

		if($routeParams.path) {

			path.user = $scope.profile.id;
			Path.update(path, function(res){
				window.location.hash = '#/editor/summary/' + res.id;
				flash.success = "Your path has been saved.";
			});

		} else {

			path.user = $scope.profile.id;
			Path.save(path, function(res){
				window.location.hash = '#/editor/step/1/' + res.id;
				flash.success = "Your path has been saved.";
			});

		}

	};

});

module.controller('EditorStepController', function ($scope, Profile, Path, $routeParams, flash) {

	$scope.profile = Profile.get();
	$scope.index = parseInt($routeParams.step,10);
	$scope.path = Path.get({id:$routeParams.path}, function(){

		// Load existing path
		if($scope.path.steps && $scope.path.steps[$scope.index - 1]) {
			$scope.step = $scope.path.steps[$scope.index - 1];
		}
	});


	// Handle step create/edit
	this.submit = function(step) {

		if(!$scope.path.steps){
			$scope.path.steps = [];
		}

		$scope.path.steps[$scope.index - 1] = step;

		Path.update($scope.path, function(res){

			var step = parseInt($scope.index, 10) + 1;
			window.location.hash = '#/editor/step/' + step +  '/' + $scope.path.id;
			flash.success = "Your step has been saved.";

		});

	};

	this.preview = function(url){

		if($scope.step.type == "Photo") {
			$("#preview").html('<img src="' + $scope.step.url + '" />');
		} else if ($scope.step.type == "Url") {
			$("#preview").html('<iframe src="' + $scope.step.url + '" ></iframe>');
		} else if ($scope.step.type == "Embed code") {
			$("#preview").html($scope.step.url);
		}

	};

	this.deleteStep = function() {

		var answer = confirm(" Are you sure you want to delete this step ?");
		if (answer){
			// Remove this step
			$scope.path.steps.splice($scope.index - 1, 1);

			// Persist to the server
			Path.update($scope.path, function(res){

				window.location.hash = '#/editor/summary/' + $scope.path.id;
				flash.success = "The step has been remove.";

			});
		}
	};

});

module.controller('EditorSummaryController', function ($scope, Profile, Path, $routeParams, flash) {

	$scope.profile = Profile.get();

	if($routeParams.path) {
		$scope.path = Path.get({id:$routeParams.path});
	}
	
	// Handle the initial creation of the path
	this.submit = function(path) {

		if(!path.published) {
			path.published = true;
		} else {
			path.published = false;
		}
		
		Path.update(path, function(res){
			flash.success = "Your path has been published.";
		});

	};

});
