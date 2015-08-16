var module = angular.module('enliten-viewer.controllers.viewer', [

]);

module.controller('ViewerController', function($scope, $http) {

    $scope.index = 1;

    // Handle the initial creation of the path
    this.next = function(path) {

        $http.get('/step/query?' + $.param({
            order: $scope.index,
            path: window.path
        })).then(function(res) {
            // this callback will be called asynchronously
            // when the response is available
            if (res.data.length > 0) {
                console.log('set step as ', res.data[0]);
                $scope.step = res.data[0];
                $scope.index++;
                $('body').animate({
                    scrollTop: 0
                });
            } else if ($scope.index > 1) {
                // if the path is completed then go back to the home page
                window.location.href = "/";
            }
        }, function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.error("Step failed to load");
        });

    };

});
