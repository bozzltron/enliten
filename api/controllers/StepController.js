/**
 * StepController
 *
 * @description :: Server-side logic for managing steps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var ObjectId = require('mongodb').ObjectID;

module.exports = {

	query: function(req, res) {
		console.log("query steps for ", req.query);

		if (req.query.order) req.query.order = parseInt(req.query.order, 10);
		if (req.query.path) req.query.path = new ObjectId(req.query.path);
		Step.find(req.query).exec(function(err, step) {

			// we now have a model with instance methods attached
			if (err) res.json({
				status: "ok",
				message: err
			});

			res.json(step);

		});

	},

	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to PathController)
	 */
	_config: {
		rest: true
	}

};
