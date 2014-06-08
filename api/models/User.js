/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
	email: {
      type: 'email',
      unique: true,
      required: true
    },
    
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },

    username: {
    	unique: true,
    	required: true,
    	type: 'string'
    }
 
  },

  beforeCreate: function (attrs, next) {
  	console.log("before create");
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);
        console.log("hashed password", hash);
        attrs.password = hash;
        next();
      });
    });
  }  

};
