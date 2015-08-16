angular.module('enlighten.services.step', ['ngResource'])

// GET PATHS
.factory('Step', function($resource) {
    return $resource('/step/:id/', {
        'id': '@id'
    }, {
        query: {
            method: 'GET',
            params: {
                path: 'path',
                order: 'order'
            },
            isArray: true
        }
    });
});
