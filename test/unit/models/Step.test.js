var assert = require('assert');
var Q = require('q');

describe('Step Model', function() {

    it('.destroy() should fix ordering gaps', function(done) {

        Path
            .create({name:'delete test', user:'boz'})
            .then(function(path){
 
                //since you're returning a promise here, you can use .then after this
                return [path, Step.create([
                	{name:'step 1', order: 1, path:path.id, url: "1"},
                	{name:'step 2', order: 1, path:path.id, url: "2"}
            	])];
            })
            .spread(function(path, steps){

                //since you're returning a promise here, you can use .then after this
                return [path, steps[1], Step.destroy({name:'step 1', path:path.id})];
            })
            .spread(function(path, step2){
     
                //since you're returning a promise here, you can use .then after this
                return [path, step2, Path.findOne({id:path.id}).populate('steps')];
            })
            .spread(function(path, step2, pathResult){

            	assert.equal(pathResult.steps.length, 1);
        		assert.equal(pathResult.steps[0].order, 1);
        		assert.equal(pathResult.steps[0].name, 'step 2');
        		
                return Q.all([
                    Path.destroy({id:path.id}),
                    Step.destroy({id:step2.id})
                ]);
            })
            .catch(function(err){
                console.log(err);
            })
            .done(function(){
                done();
            });                


    });

});



