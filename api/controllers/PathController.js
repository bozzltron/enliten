/**
 * PathController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


var _ = require('underscore');
var request = require('request');

module.exports = {


	pathsCompleted: function (req, res) {

		if(!req.session.user) {

			res.json({});

		} else {

			Status.find({user: req.session.user, isCompleted:true}).exec(function(err, completed) {

				if(err) res.json({status:"ok", message: err});

				var paths = [];
				completed.forEach(function(path){
					paths.push( path.id );
				});

				console.log(paths);
				Path.find({ id: paths}).exec(function(err, status) {

				  // we now have a model with instance methods attached
				  if(err) res.json({status:"ok", message: err});

				  res.json(status);

				});

			});

		}

	},

	paths: function (req, res) {

		if(!req.session.user) {

			Path.find({published:true}).exec(function(err, paths) {

				// we now have a model with instance methods attached
				if(err) res.json({status:"ok", message: err});

				res.json(paths);

			});

		} else {

			Path.find({published:true}).exec(function(err, paths) {

			  	// we now have a model with instance methods attached
			 	if(err) res.json({status:"ok", message: err});

				Status.find({user: req.session.user, isCompleted:true}).exec(function(err, completed) {

					if(err) res.json({status:"ok", message: err});

					var complete = [];
					completed.forEach(function(path){
						complete.push( path.path );
					});
					console.log(complete);

					paths.forEach(function(path){
						console.log(path.id);
						if(_.contains(complete, path.id)){
							console.log("completed");
							path.isCompleted = true;
						}
					});

					res.json(paths);

				});

			});



		}

	},

	my: function (req, res) {

		if(req.session.user) {

			Path.find({user:req.session.user}).exec(function(err, paths) {

				// we now have a model with instance methods attached
				if(err) res.json({status:"failure", message: err});

				res.json(paths);

			});

		} else {
			res.json([]);
		}

	},

	preview: function (req, res) {

		var https = require("https");
		var fullUrl = "https://enliten-resizer.herokuapp.com/query?&url=" + req.query.url;
		var datauri = "";

		request({uri:fullUrl, encoding:null}, function (error, response, body) {
          if (!error && response.statusCode == 200) {

                var data_uri_prefix = "data:" + response.headers["content-type"] + ";base64,";
                //data:image/png;base64,
                //console.log('body', body);
                var buf = new Buffer(body, 'binary');
                var image = buf.toString('base64');

                image = data_uri_prefix + image;

                //res.set('Content-Type', 'image/png');
                res.send(image);

          }
        });

	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PathController)
   */
  _config: {
      rest:true,
	  shortcuts:true,
	  actions:true
  }


};
