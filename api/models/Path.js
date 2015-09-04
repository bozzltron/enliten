/**
 * Path
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            unique: true,
            required: true
        },

        description: {
            type: 'string'
        },

        url: {
            type: 'string'
        },

        user: {
            type: 'string',
            required: true
        },

        steps: {
            collection: 'step',
            via: 'path'
        }

    },

    reorder: function(path) {
        console.log('beforeFixing', path.steps);
        var toBeSaved = [];

        if(path && path.steps) {

            // find steps that need changing
            path.steps.forEach(function(step, i) {

                // check for incorrect order
                if (step.order != i + 1) {
                    step.order = i + 1;

                    // Add promise to array
                    toBeSaved.push(Step.update({
                        id: step.id
                    }, step));
                }

            });
            
            var Promise = require('q');
            console.log('toBeSaved', toBeSaved);
            if(toBeSaved.length > 0) {

                // asynchronously update steps and return a promise
                return Promise.all(toBeSaved);

            }

        } 

        return Promise(undefined);

    },

    cleanUpOrder: function(path) {
 
        if(path) {

            var id = typeof(path) === "string" ? path : path.id;
            
            // Run cleanup and return a promise
            return Path
                .findOne({ id: id })
                .populate("steps")
                .then(function(path) {
    
                    //act on result
                    return Path.reorder(path);
                });

        } else {
            return Promise(undefined);
        }

    },

    saveSteps: function(path) {
        
        // handle manual order changes
        var Promise = require('q');

        if(path && path.steps) {
        
            // asynchronously update steps and return a promise
            return Promise.spread(path.steps, function(step, i) {
                step.order = i + 1;
                console.log("saving ", step);
                return Step.update({
                    id: step.id
                }, step);   
            });
        } else {
            return Promise(undefined);
        }

    },

    afterUpdate: function(path, cb) {

        Path
            .saveSteps(path)
            .catch(function(err){
                console.log(err);
            })
            .done(function(){
                cb();
            });
    }

};
