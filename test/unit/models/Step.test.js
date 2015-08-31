var assert = require('assert');
var Q = require('q');

describe('Step Model', function() {

    it('.destroy() should fix ordering gaps', function(done) {

        Path
            .create({name:'delete test', user:'boz'})
            .then(function(path){
                return [path, Step.create([
                	{name:'step 1', order: 1, path:path.id, url: "1"},
                	{name:'step 2', order: 2, path:path.id, url: "2"},
                	{name:'step 3', order: 3, path:path.id, url: "3"}
            	])];
            })
            .spread(function(path, steps){
                return [path, steps[0], steps[2], Step.destroy({id:steps[1].id})];
            })
            .spread(function(path, step1, step3){
                return [path, step1, step3, Path.findOne({id:path.id}).populate('steps')];
            })
            .spread(function(path, step1, step3, pathResult){

            	assert.equal(pathResult.steps.length, 2);
        		assert.equal(pathResult.steps[0].order, 1);
        		assert.equal(pathResult.steps[0].name, 'step 1');
        		assert.equal(pathResult.steps[1].order, 2);
        		assert.equal(pathResult.steps[1].name, 'step 3');        		

                return Q.all([
                    Path.destroy({id:path.id}),
                    Step.destroy({id:step1.id}),
                    Step.destroy({id:step3.id})
                ]);
            })
            .done(function(){
                done();
            });                


    });

});



