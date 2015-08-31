var assert = require('assert');
var Q = require('q');

describe('Path Model', function() {

    it('.cleanUpOrder() should fix ordering gaps', function(done) {

        Path
            .create({name:'cleanup test', user:'boz'})
            .then(function(path){
                //since you're returning a promise here, you can use .then after this
                return [path, Step.create({name:'step 1', order: 1, path:path.id, url: "1"})];
            })
            .spread(function(path, step1){
                return [path, step1, Step.create({name:'step 2', order: 2, path:path.id, url: "2"})];
            })
            .spread(function(path, step1, step2){
                return [path, step1, step2, Path.cleanUpOrder(path)];
            })
            .spread(function(path, step1, step2){
                return [path, step1, step2, Step.findOne({name: 'step 2', path:path.id})];
            })
            .spread(function(path, step1, step2, step2update){
    
                assert.equal(step2update.order, 2);

                return Q.all([
                    Path.destroy({id:path.id}),
                    Step.destroy({id:step1.id}),
                    Step.destroy({id:step2.id})
                ]);

            })
            .done(function(){
                done();
            });

    });

    it('.saveSteps() should save steps when they are passed', function(done) {

        Path
            .create({name:'save steps test', user:'boz'})
            .then(function(path){
                //since you're returning a promise here, you can use .then after this
                return Path.update({id:path.id}, {
                    steps:[
                        {name:'step 1', order: 1, path:path.id, url: "1"},
                        {name:'step 2', order: 2, path:path.id, url: "1"}
                    ]});
            })
            .then(function(path){
                return Path.findOne({id:path[0].id}).populate('steps');
            })
            .then(function(path){
                assert.equal(path.steps.length, 2);
                assert.equal(path.steps[0].order, 1);
                assert.equal(path.steps[0].name, 'step 1');
                assert.equal(path.steps[1].order, 2);
                assert.equal(path.steps[1].name, 'step 2');

                return Q.all([
                    Path.destroy({id:path.id}),
                    Step.destroy({id:path.steps[0].id}),
                    Step.destroy({id:path.steps[1].id})
                ]);
            })
            .done(function(){
                done();
            });

    });

});

