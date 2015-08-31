var frisby = require('frisby');
var config = require("./config.json");
var _ = require('underscore');

module.exports = {

	// Gets a Paydia session
	getSession: function(cb){
	
		// Get a session
		frisby.create('Login user')
			.post(config.server + "/login",{
				"username":  config.username,
				"password":  config.password,
			}, {json: true})
			.expectStatus(200)
			.expectHeaderContains('Content-Type', 'json')
			.expectJSONTypes({
				status: String,
				message: String
			})
			.after(function(){

				setTimeout(function(){

				frisby.create('Get profile')
					.get(config.server + '/profile')
					.expectStatus(200)		
					.expectJSONTypes({
						username: String,
						email: String,
						createdAt: String,
						updatedAt: String,
						id: String,
						hash: String
					})
					.afterJSON(cb)
				.toss();

				}, 500);


			})
		.toss();

	},

	// Generate a string of a certain length
	stringGen: function (len) {
	    var text = " ";
	    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < len; i++ ) {
	        text += charset.charAt(Math.floor(Math.random() * charset.length));
	    }
    	return text;
	},

	// Create
	create: function(res, options, cb) {

		options.postData.user = res.id;

	    frisby.create('Create a ' + options.module)
	     	.post(config.server + '/' + options.module, options.postData, {json: true})
		 	.expectStatus(201)
		 	.inspectBody()
		 	.after(cb)
	    .toss();	  	

	},

	// Read all 
	readAll: function(res, options, cb) {

	    frisby.create('Read all ' + options.module + 's')
	      .get(config.server + '/' + options.module, {json: true})
	      .expectStatus(200)
		  .expectHeaderContains('Content-Type', 'json')
	      .expectJSONTypes(options.validateReadAllTypes)
	      .inspectBody()
	      .afterJSON(cb)	  
	    .toss();	

	},

	// Read one 
	read: function(res, options, cb) {

		frisby.create('Read a ' + options.module )
			.get(config.server + '/path/' + options.createdId, {json: true})
			.expectStatus(200)
			.expectHeaderContains('Content-Type', 'json')
			.expectJSONTypes(options.validateReadTypes)
			.inspectBody()
			.afterJSON(cb)
		.toss();	

	},

	// Update
	update: function(res, options, cb) {

	    frisby.create('Update a ' + options.module )
	      .patch(config.server + res.uri, options.updateData, {json: true})
	      .expectStatus(204)
	      .inspectBody()
		  .after(function(){ cb(res); })
	    .toss();	

	},

	// Delete
	dlete: function(res, options, cb) {

	    frisby.create('Delete a ' + options.module )
	      .delete(config.server + res.uri, {json: true})
	      .expectStatus(204)
	      .inspectBody()
	      .after(cb)
	    .toss();

	},

	// Shortcut for creating an object and returning its id
	createAndRead: function(options, cb) {

		this.getSession(function(res){
			
			this.create(res, options, function(res){

				this.readAll(res, options, function(res){

					this.read(res, options, cb);

				}.bind(this));

			}.bind(this));

		}.bind(this));

	}

};