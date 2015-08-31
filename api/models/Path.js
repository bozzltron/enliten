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

    reorder: function(path, cb) {

        var toBeSaved = [];

        console.log("path steps", path.steps);
        // find steps that need changing
        path.steps.forEach(function(step, i) {

            // check for incorrect order
            if (step.order != i + 1) {
                step.order = i + 1;
                toBeSaved.push(step);
            }

        });

        var Promise = require('q');

        // asynchronously update steps and return a promise
        return Promise.spread(toBeSaved, function(step) {
            return Step.update({
                id: step.id
            }, step);
        });

    },

    cleanUpOrder: function(path, cb) {

        // Run cleanup and return a promise
        if (typeof(path) == "String") {
            return Path
                .findOne({
                    id: path
                })
                .populate("steps")
                .then(function(path) {
                    //act on result
                    return Path.reorder(path);
                });
        } else {
            return Path.findOne({
                id: path.id
            })
            .populate("steps")
            .then(function(path) {
                //act on result
                return Path.reorder(path);
            });

        }

    },

    saveSteps: function(path, cb) {
        cb();
    },

    afterUpdate: function(path, cb) {
        this.saveSteps(path, cb);
    },

    afterCreate: function(path, cb) {
        this.saveSteps(path, cb);
    }

};
