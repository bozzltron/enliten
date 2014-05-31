angular.module('enlighten.services.path', ['ngResource'])    

    // GET PATHS 
    .factory('Path', function($resource) {
        return $resource('/path/:filter/:id',
        	{},
        	{
        		completed: {
        			method: 'GET',
        			params: {
        				filter: 'completed',
        			},
        			isArray:true
        		},
                update: { 
                    method:'PUT',
                    params: {
                        statusId: '@id'
                    }
                },
                my: {
                    method: 'GET',
                    params: {
                        filter: 'my'
                    },
                    isArray: true
                }            
        	});
    });
