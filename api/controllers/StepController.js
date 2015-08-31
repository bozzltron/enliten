/**
 * StepController
 *
 * @description :: Server-side logic for managing steps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	query: function(req, res) {
		console.log("query steps for ", req.query);

		if (req.query.order) req.query.order = parseInt(req.query.order, 10);

		Step.find({
			where: req.query,
			sort: 'order ASC'
		}).exec(function(err, step) {

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
