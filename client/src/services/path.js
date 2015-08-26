angular.module('enlighten.services.path', ['ngResource'])

    // GET PATHS
    .factory('Path', function($resource) {
        return $resource('/path/:id/',
        	{'id':'@id'},
        	{
        		completed: {
        			method: 'GET',
        			params: {
        				id: 'completed',
        			},
        			isArray:true
        		},
                update: {
                    method:'Put'
                },
                my: {
                    method: 'GET',
                    params: {
                        id: 'my'
                    },
                    isArray: true
                }
        	});
    });
