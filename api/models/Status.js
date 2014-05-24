/**
 * Status
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
	user: {
      type: 'string',
      unique: true,
      required: true
    },
    
    path: {
      type: 'integer',
      required: true,
    },

    step: {
    	type: 'integer',
      	required: true
    },

    isCompleted: {
    	type: 'boolean',
      required: true
    }

  },

  beforeCreate: function (attrs, next) {
    if(req.session.user) {
      attrs.user = req.session.user;
    }
    next();
  }    

};
