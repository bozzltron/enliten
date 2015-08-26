var module = angular.module('enliten-viewer.controllers.viewer', [
    'ngCookies'
]);

module.controller('ViewerController', function($scope, $http, $cookies) {

    $scope.index = 1;

    var controller = this;
    $('#enliten-viewer').swipe({
        allowPageScroll: "vertical",
        //Generic swipe handler for all directions
        swipe: function(event, direction, distance,
            duration,
            fingerCount, fingerData) {

            if (direction == 'left') {
                controller.next();
            } else if (direction == 'right') {

            }
        },
        threshold: 150
    });

    // Handle getting the next step
    this.next = function(path) {
        $(".step").css('display', 'none');
        $http.get('/step/query?' + $.param({
            order: $scope.index,
            path: window.path
        })).then(function(res) {

                // this callback will be called asynchronously
                // when the response is available
                if (res.data.length > 0) {

                    // set progress cookie
                    $cookies.put(window.path, $scope.index);

                    // Set step
                    $scope.step = res.data[0];
                    $scope.index++;

                    // scroll back to the top
                    $('body').animate({
                        scrollTop: 0
                    });
                    $(".step").css('display', 'block');

                } else if ($scope.index > 1) {
                    // if the path is completed then go back to the home page
                    window.location.href = "/";
                    $cookies.remove(window.path);
                }
            },
            function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.error("Step failed to load");
            });

    };

    this.resume = function() {
        var status = $cookies.get(window.path);
        $scope.index = status;
        controller.next();
    };

    $scope.resume = false;
    // check for a progress cookie
    var status = $cookies.get(window.path);
    if (status !== undefined) {
        $scope.resume = true;
    }

});
