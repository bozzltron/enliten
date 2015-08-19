var module = angular.module('enlighten.controllers.editor', [
	'enlighten.services.profile',
	'enlighten.services.path',
	'enlighten.services.step',
	'ngRoute',
	'ui'
]);

module.controller('EditorController', function($scope, Profile, Path, Step,
	$routeParams, flash) {

	$scope.profile = Profile.get();

	if ($routeParams.path) {
		$scope.path = Path.get({
			id: $routeParams.path
		});
	}

	// Handle the initial creation of the path
	this.submit = function(path) {

		if ($routeParams.path) {

			path.user = $scope.profile.id;
			Path.update(path, function(res) {
				window.location.hash = '/admin/#/editor/summary/' + res.id;
				flash.success = "Your path has been saved.";
			});

		} else {

			path.user = $scope.profile.id;
			Path.save(path, function(res) {
				window.location.hash = '#/editor/step/1/' + res.id;
				flash.success = "Your path has been saved.";
			});

		}

	};

});

module.controller('EditorStepController', function($scope, Profile, Path, Step,
	$routeParams, flash, $http) {

	$scope.profile = Profile.get();
	$scope.index = parseInt($routeParams.step, 10);

	$scope.path = Path.get({
		id: $routeParams.path
	}, function(path) {

		$scope.step = {};
		$http.get('/step/query?' + $.param({
			order: $scope.index,
			path: path.id
		})).then(function(res) {
			// this callback will be called asynchronously
			// when the response is available
			if (res.data.length > 0) {
				console.log('set step as ', res.data[0]);
				$scope.step = res.data[0];
			}

		}, function(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});

	});

	// Handle step create/edit
	this.save = function() {

		$scope.step.path = $scope.path.id;
		$scope.step.user = $scope.profile.id;
		$scope.step.order = $scope.index;
		console.log("save", $scope.step);

		if ($scope.step.id) {

			Step.update($scope.step, function(res) {

				var step = parseInt($scope.index, 10) + 1;
				window.location.hash = '#/editor/step/' + step + '/' + $scope.path
					.id;
				flash.success = "Your step has been updated.";

			});

		} else {

			Step.save($scope.step, function(res) {

				var step = parseInt($scope.index, 10) + 1;
				window.location.hash = '#/editor/step/' + step + '/' + $scope.path
					.id;
				flash.success = "Your step has been saved.";

			});

		}

	};

	this.search = function() {

		// Simple GET request example :
		var params = {
			q: $('.search:first').val(),
			f: 'json',
			start: 1,
			length: 10,
			l: 'en',
			src: 'web',
			i: false,
			key: 'Dt610xc7abKOq36BZXHDgJGNZ3E_'
		};

		$http.get('http://www.faroo.com/api?' + $.param(
			params)).
		then(function(response) {
			// this callback will be called asynchronously
			// when the response is available
			console.log('faroo', response);
			if (response.data.results.length > 0) {
				$scope.results = response.data.results;
			} else {
				$scope.results = [{
					title: 'Nothing found.  Keep looking.'
				}];
			}
		}, function(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			flash.error = "Your step has been saved.";
		});


	};

	this.add = function(result) {
		console.log("result", result);
		$scope.step.name = result.title;
		console.log("path", $scope.path);
		$scope.step.path = $scope.path.id;
		$scope.step.user = $scope.profile.id;
		$scope.step.order = $scope.index;
		$scope.step.description = result.kwic;
		$scope.step.iurl = result.iurl;
		$scope.step.url = result.url;
		$scope.step.type = 'Url';
	};

	this.preview = function(url) {

		// clear search
		$scope.results = null;


		if ($scope.step.type == "Embed code") {
			$("#preview").html($scope.step.url);
			$scope.step.iurl = null;
		} else if ($scope.step.iurl) {
			$("#preview").html('<img src="' + $scope.step.iurl + '" />');
		} else if ($scope.step.type == "Photo") {
			$("#preview").html('<img src="' + $scope.step.url + '" />');
			$scope.step.iurl = null;
		} else if ($scope.step.type == "Url") {
			$("#preview").html(
				'<i class="fa fa-cog fa-spin"></i> Capturing screenshot...');
			$.get("/path/preview?url=" + $scope.step.url, function(datauri) {
				$scope.step.iurl = datauri;
				$("#preview").html('<img class="img-thumbnail img-responsive" src="' +
					datauri + '" />');
			});
		}

	};

	this.deleteStep = function() {

		var answer = confirm(" Are you sure you want to delete this step ?");
		if (answer) {

			// Remove this step
			$scope.index = parseInt($routeParams.step, 10);


			// Persist to the server
			Step.delete($scope.step, function(res) {

				window.location.hash = '#/editor/summary/' + $scope.step.id;
				flash.success = "The step has been remove.";

			});
		}
	};

});

module.controller('EditorSummaryController', function($scope, Profile, Path,
	Step, $routeParams, flash, $http) {

	$scope.profile = Profile.get();

	if ($routeParams.path) {
		$scope.path = Path.get({
			id: $routeParams.path
		}, function() {

			$http.get('/step/query?' + $.param({
				path: $routeParams.path
			})).then(function(res) {
				// this callback will be called asynchronously
				// when the response is available
				if (res.data.length > 0) {
					$scope.path.steps = res.data;
				}
			}, function(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

		});
	}

	this.save = function(path) {

		for (var i = 0; i < path.steps.length; i++) {
			var step = path.steps[i];
			if (!step.order || step.order !== i + 1) {
				step.order = i + 1;
			}
		}

		Path.update(path, function(res) {
			flash.success = "Your path has been update.";
		});

	};

	this.delete = function(path) {

		var answer = confirm("Are you sure you want to delete this path?");

		if (answer) {
			Path.delete(path, function(res) {
				flash.success = "Your path has been deleted.";
				window.location.hash = '#/profile/';
			});
		}

	};

	// Handle the initial creation of the path
	this.submit = function(path) {

		if (!path.published) {
			path.published = true;
		} else {
			path.published = false;
		}

		Path.update(path, function(res) {
			flash.success = "Your path has been published.";
		});

	};

});
