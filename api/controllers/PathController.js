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

var ObjectId = require('mongodb').ObjectID;

module.exports = {
    
  
	pathsCompleted: function (req, res) {

		if(!req.session.user) {

			res.json({});

		} else {
	
			Status.find({user: req.session.user, isCompleted:true}).done(function(err, completed) {

				if(err) res.json({status:"ok", message: err});

				var paths = [];
				completed.forEach(function(path){
					paths.push( new ObjectId(path.path) );
				});
		
				console.log(paths);
				Path.find({ _id: paths}).done(function(err, status) {

				  // we now have a model with instance methods attached
				  if(err) res.json({status:"ok", message: err});

				  res.json(status);

				});

			});

		}
	
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PathController)
   */
  _config: {}

  
};
