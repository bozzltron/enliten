angular.module('enlighten.services.step', ['ngResource'])

// GET PATHS
.factory('Step', function($resource) {
    return $resource('/step/:id/', {
        'id': '@id'
    }, {
        update: {
            method: 'Put'
        }
    });
});
