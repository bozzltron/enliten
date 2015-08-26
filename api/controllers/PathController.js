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

	home: function(req, res) {

		Path.find({
			published: true,
			limit: 10
		}).exec(function(err, paths) {

			// we now have a model with instance methods attached
			if (err) res.json({
				status: "ok",
				message: err
			});

			res.locals.layout = 'vortex';
			res.view('homepage', {
				paths: paths
			});

		});

	},

	pathsCompleted: function(req, res) {

		if (!req.session.user) {

			res.json({});

		} else {

			Status.find({
				user: req.session.user,
				isCompleted: true
			}).exec(function(err, completed) {

				if (err) res.json({
					status: "ok",
					message: err
				});

				var paths = [];
				completed.forEach(function(path) {
					paths.push(path.id);
				});

				Path.find({
					id: paths
				}).exec(function(err, status) {

					// we now have a model with instance methods attached
					if (err) res.json({
						status: "ok",
						message: err
					});

					res.json(status);

				});

			});

		}

	},

	paths: function(req, res) {

		req.query = req.query || {};
		req.query.published = true;

		if (!req.session.user) {

			Path.find(req.query).exec(function(err, paths) {

				// we now have a model with instance methods attached
				if (err) res.json({
					status: "ok",
					message: err
				});

				res.json(paths);

			});

		} else {

			Path.find(req.query).exec(function(err, paths) {

				// we now have a model with instance methods attached
				if (err) res.json({
					status: "ok",
					message: err
				});

				Status.find({
					user: req.session.user,
					isCompleted: true
				}).exec(function(err, completed) {

					if (err) res.json({
						status: "ok",
						message: err
					});

					var complete = [];
					completed.forEach(function(path) {
						complete.push(path.path);
					});

					paths.forEach(function(path) {
						if (_.contains(complete, path.id)) {
							path.isCompleted = true;
						}
					});

					res.json(paths);

				});

			});

		}

	},

	my: function(req, res) {

		if (req.session.user) {

			Path.find({
				user: req.session.user
			}).exec(function(err, paths) {

				// we now have a model with instance methods attached
				if (err) res.json({
					status: "failure",
					message: err
				});

				res.json(paths);

			});

		} else {
			res.json([]);
		}

	},

	preview: function(req, res) {

		var fullUrl =
			"https://enliten-resizer.herokuapp.com/query?width=1280&height=720&url=" +
			req.query
			.url;
		var datauri = "";

		request({
			uri: fullUrl,
			encoding: null
		}, function(error, response, body) {
			if (!error && response.statusCode == 200) {

				var data_uri_prefix = "data:" + response.headers["content-type"] +
					";base64,";
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

	migrate: function(req, res) {

		Path.find({}).exec(function(err, paths) {

			paths.forEach(function(path) {

				path.steps.forEach(function(step, i) {
					console.log(step.name);
					step.path = path.id;
					step.user = path.user;
					step.order = i + 1;
					step.url = step.url;
					step.iurl = step.datauri || step.url;
					delete step.datauri;
					Step.create(step).exec(function(err, result) {
						if (err) console.log("fail");
						console.log("success");
					});
				});


			});

			res.send("Done");

		});

	},

	clean: function(req, res) {

		Path.native(function(err, collection) {
			if (err) return res.serverError(err);

			collection.updateMany({}, {
				$unset: {
					steps: ''
				}
			});

			res.send("Done");

		});

	},

	explore: function(req, res) {

		Path.findOne({
			id: req.param("path")
		}).exec(function(err, path) {

			// we now have a model with instance methods attached
			if (err) res.json({
				status: "failure",
				message: err
			});

			if (req.param("step")) {

				Step.findOne({
					id: req.param("step")
				}).exec(function(err, step) {

					res.locals.layout = 'vortex';
					res.view('walk', {
						path: path,
						step: step
					});

				});

			} else {

				res.locals.layout = 'vortex';
				res.view('explore', {
					path: path,
					step: null
				});

			}


		});


	},

	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to PathController)
	 */
	_config: {
		rest: true,
		shortcuts: true,
		actions: true
	}


};
