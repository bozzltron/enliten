angular.module('enlighten.controllers', ['ngResource', 'enlighten.services']).controller('Paths', function ($scope, $resource, getPathService) {

	$scope.paths = getPathService.query();

});