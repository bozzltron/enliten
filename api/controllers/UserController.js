/**
 * UserController
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

module.exports = {

	login: function (req, res) {
	    var bcrypt = require('bcrypt');
	    console.log("req", req.body);
	    User.findOne({username: req.body.username}).done(function (err, user) {
	    	console.log("login user", user);
	      if (err) res.json({ status:"failure", message: 'DB error' }, 500);

	      if (user) {
	        bcrypt.compare(req.body.password, user.password, function (err, match) {
	          if (err) res.json({ status:"failure", message: 'Server error' }, 500);

	          if (match) {
	            // password match
	            req.session.user = user.id;
	            res.json({status:'success', message:'Welcome back ' + req.body.username});
	          } else {
	            // invalid password
	            if (req.session.user) req.session.user = null;
	            res.json({status:'failure', message:'Invalid password!'});
	          }
	        });
	      } else {
	      	res.json({status:'failure', message:'User not found!'});
	      }
	    });
	},


	register: function (req, res) {

	    User.findOneByEmail(req.body.email).done(function (err, user) {
	      if (err) res.json({ error: 'DB error' }, 500);

	      if (user) {
	      	req.json({status:"failure", message:"This user already exists"});
	      } else {
	      	console.log(req.body);
	      	User.create(req.body).done(function(err, user) {

			  // Error handling
			  if (err) {
			    res.json({status:"failure", message:err});

			  // The User was created successfully!
			  }else {
			  	delete user.password;
			  	res.json(user);
			  }
			});

	      }
	    });
	},

	logout: function(req, res) {
		req.session.user = null;
		res.redirect('/');
	},

	session: function(req, res) {
		res.json({session:req.sessionID, authenticated: req.session.authenticated});
	},

	profile: function(req, res){

		console.log("profile session", req.session.user);
		if(req.session.user) {
		    User.findOne(req.session.user).done(function (err, user) {
		      if (err) res.json({ status:"failure", message: 'DB error' }, 500);

		      if (user) {
		      	delete user.password;
		 		res.json(user);
		      } else {
		      	res.json({status:'failure', message:'User not found!'});
		      }
		    });		
		} else {
			res.json({});
		}

	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
