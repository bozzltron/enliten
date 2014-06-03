var frisby = require('frisby');
var config = require("./config.json");
var _ = require('underscore');
var util = require('./util');

module.exports = function(options) {

	util.getSession(function(res){

		util.create(res, options, function(res){
			
			console.log("create response", res);
			util.readAll(res, options, function(res){

				util.read(res, options, function(res){

					util.dlete(res, options, function(res){

						if(options.cleanup) {
							options.cleanup();
						}

					});

				});

			});

		});

	});

};