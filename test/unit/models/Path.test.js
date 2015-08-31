var assert = require('assert');


describe('Path Model', function() {

    it('.cleanUpOrder() should fix ordering gaps', function(done) {

        Path
            .create({name:'cleanup test', user:'boz'})
            .then(function(path){
                //since you're returning a promise here, you can use .then after this
                return [path, Step.create({name:'step 1', order: 1, path:path.id, url: "1"})];
            })
            .spread(function(path, step1){
                return [path, step1, Step.create({name:'step 2', order: 1, path:path.id, url: "2"})];
            })
            .spread(function(path, step1, step2){
                return [path, step1, step2, Path.cleanUpOrder(path)];
            })
            .spread(function(path, step1, step2){
                return [path, step1, step2, Step.findOne({name: 'step 2', path:path.id})];
            })
            .spread(function(path, step1, step2, step2update){
    
                assert.equal(step2update.order, 2);

                var Q = require('q');

                return Q.all([
                    Path.destroy({id:path.id}),
                    Step.destroy({id:step1.id}),
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

