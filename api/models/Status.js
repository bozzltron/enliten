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
      required: true
    },
    
    path: {
      type: 'string',
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

  }

};
